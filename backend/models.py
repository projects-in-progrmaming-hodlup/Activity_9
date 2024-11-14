# backend/models.py
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    phone_number = Column(String, index=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    alerts = relationship("Alert", back_populates="user")

class Cryptocurrency(Base):
    __tablename__ = 'cryptocurrencies'
    crypto_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    market_cap = Column(Float, nullable=True)
    hourly_price = Column(Float, nullable=True)
    hourly_percentage = Column(Float, nullable=True)
    time_updated = Column(DateTime, nullable=True)

    alerts = relationship("Alert", back_populates="cryptocurrency")

class Alert(Base):
    __tablename__ = 'alerts'
    alert_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    crypto_id = Column(Integer, ForeignKey('cryptocurrencies.crypto_id'), nullable=False)
    threshold_price = Column(Float, nullable=True)
    threshold_percentage = Column(Float, nullable=True)
    method = Column(String, nullable=True)
    notification_method = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="alerts")
    cryptocurrency = relationship("Cryptocurrency", back_populates="alerts")
