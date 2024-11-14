# Activity 9 - HodlUp Full Stack 

This project is a full-stack application that integrates a React frontend with a FastAPI backend to provide cryptocurrency data and alert functionality.

## Project Structure

The project is organized into two main directories:

1. `frontend/`: Contains the React application
2. `backend/`: Contains the FastAPI server

## Features

### API Integration

1. GET `/cryptocurrencies/`
   - Retrieves all cryptocurrency data from the database
   - Implemented in `backend/main.py`

2. POST `/update-cryptocurrencies/`
   - Manually triggers an update of cryptocurrency data from CoinGecko API
   - Implemented in `backend/main.py`

3. POST `/alerts/`
   - Creates a new alert based on user input
   - Implemented in `backend/main.py`

4. Automated Updates
   - Background scheduler updates cryptocurrency data every 10 minutes

### User Interaction

1. Cryptocurrency Data Retrieval
   - Button click in `frontend/src/App.js` triggers GET request to `/cryptocurrencies/`
   - Fetches and displays cryptocurrency data from the backend

2. Alert Creation
   - Form submission in `NotificationForm` component (not shown in provided code)
   - Allows users to set up alerts for specific cryptocurrencies

### Component Architecture

React components are split into separate files for better organization:

- `frontend/src/App.js`: Main component
- `frontend/src/components/NotificationForm.js`: Form for creating alerts
- `frontend/src/components/Confirmation.js`: Displays confirmation of created alerts

## API Endpoints

### GET /cryptocurrencies/

Retrieves all cryptocurrency data from the database.

**Response:**
```json
[
  {
    "id": 1,
    "name": "bitcoin",
    "market_cap": 1000000000000,
    "hourly_price": 50000,
    "hourly_percentage": 2.5,
    "time_updated": "2023-11-14T12:00:00"
  },
  ...
]
```

### POST /update-cryptocurrencies/

Manually triggers an update of cryptocurrency data from CoinGecko API.

**Response:**
```json
{
  "status": "success",
  "message": "Cryptocurrencies updated successfully."
}
```

### POST /alerts/

Creates a new alert based on user input.

**Request Body:**
```json
{
  "user_id": 1,
  "crypto_id": 1,
  "threshold_price": 55000,
  "threshold_percentage": null,
  "method": "Threshold",
  "notification_method": "Email"
}
```

**Response:**
```json
{
  "status": "success",
  "alert_id": 1,
  "message": "Alert created successfully."
}
```

## Setup Instructions

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Set up environment variables:
   Create a `.env` file in the backend directory with the following variables:
   ```
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_HOST=your_database_host
   DB_NAME=your_database_name
   CRYPTO_IDS=bitcoin,ethereum
   ```

6. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
