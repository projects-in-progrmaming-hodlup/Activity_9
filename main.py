from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, select
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from dotenv import load_dotenv
from datetime import datetime
import os
import requests
from apscheduler.schedulers.background import BackgroundScheduler

load_dotenv()
app = FastAPI()

#database setup
DATABASE_URL = f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

#model
class Cryptocurrency(Base):
    __tablename__ = 'cryptocurrencies'
    crypto_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    market_cap = Column(Float, nullable=True)
    hourly_price = Column(Float, nullable=True)
    hourly_percentage = Column(Float, nullable=True)
    time_updated = Column(DateTime, nullable=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#integrate oinGecko API 
def fetch_coingecko_data():
    url = "https://api.coingecko.com/api/v3/coins/markets"
    crypto_ids = os.getenv("CRYPTO_IDS", "bitcoin,ethereum") #default to bitcoin and ethereum
    params = {
        "vs_currency": "usd",  #base currency
        "ids": crypto_ids, 
        "order": "market_cap_desc",
        "per_page": 100,
        "page": 1,
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()  #return the list of cryptocurrencies
    except requests.RequestException as e:
        print(f"Error fetching data from CoinGecko: {e}")
        return None

#store CoinGecko data in the database
def update_cryptocurrency_data(db: Session, data: list):
    for crypto in data:
        crypto_id = crypto["id"]
        market_cap = crypto.get("market_cap", 0.0)
        current_price = crypto.get("current_price", 0.0)
        price_change_percentage = crypto.get("price_change_percentage_24h", 0.0)
        last_updated = crypto.get("last_updated", datetime.now().isoformat())

        existing_crypto = db.query(Cryptocurrency).filter(Cryptocurrency.name == crypto_id).first()

        if existing_crypto: #update existing record
            existing_crypto.market_cap = market_cap
            existing_crypto.hourly_price = current_price
            existing_crypto.hourly_percentage = price_change_percentage
            existing_crypto.time_updated = datetime.fromisoformat(last_updated.replace("Z", ""))
        else: #insert new record
            new_crypto = Cryptocurrency(
                name=crypto_id,
                market_cap=market_cap,
                hourly_price=current_price,
                hourly_percentage=price_change_percentage,
                time_updated=datetime.fromisoformat(last_updated.replace("Z", "")),
            )
            db.add(new_crypto)

    db.commit()

#endpoint to update cryptocurrencies
@app.post("/update-cryptocurrencies/")
def update_cryptocurrencies(db: Session = Depends(get_db)):
    try:
        data = fetch_coingecko_data()  #fetch data from CoinGecko

        if not data:
            raise HTTPException(status_code=500, detail="Failed to fetch data from CoinGecko.")

        update_cryptocurrency_data(db, data)

        return {"status": "success", "message": "Cryptocurrencies updated successfully."}
    except Exception as e:
        print(f"Error updating cryptocurrencies: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#endpoint to get all cryptocurrencies
@app.get("/cryptocurrencies/", response_model=list)
def get_all_cryptocurrencies(db: Session = Depends(get_db)):
    try:
        stmt = select(Cryptocurrency)
        cryptos = db.execute(stmt).scalars().all()

        return [
            {
                "id": crypto.crypto_id,
                "name": crypto.name,
                "market_cap": crypto.market_cap,
                "hourly_price": crypto.hourly_price,
                "hourly_percentage": crypto.hourly_percentage,
                "time_updated": crypto.time_updated.isoformat() if crypto.time_updated else None,
            }
            for crypto in cryptos
        ]
    except Exception as e:
        print(f"Error retrieving cryptocurrencies: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#scheduler to automate updates
scheduler = BackgroundScheduler()

#job to update cryptocurrencies
def scheduled_update():
    with SessionLocal() as db:
        data = fetch_coingecko_data()
        if data:
            update_cryptocurrency_data(db, data)

scheduler.add_job(scheduled_update, "interval", minutes=10)

@app.on_event("startup")
def startup_event():
    if not scheduler.running: 
        scheduler.start()

@app.on_event("shutdown")
def shutdown_event():
    if scheduler.running: 
        scheduler.shutdown()
