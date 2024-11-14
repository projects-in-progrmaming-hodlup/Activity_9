// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import NotificationForm from './components/NotificationForm';
import Confirmation from './components/Confirmation';
import axios from 'axios';

function App() {
  const [alertData, setAlertData] = useState(null);
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

  // Fetch cryptocurrencies from backend
  const fetchCryptocurrencies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/cryptocurrencies/`);
      setCryptocurrencies(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching cryptocurrencies:', err);
      setError('Failed to fetch cryptocurrencies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptocurrencies();
  }, []);

  const handleSubmit = (data) => {
    setAlertData(data);
    console.log('Alert Data:', data);
  };

  return (
    <div className="App">
      {/* If you have a Header component, include it here */}
      {/* <Header /> */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={fetchCryptocurrencies} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Cryptocurrencies'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && (
        <NotificationForm
          onSubmit={handleSubmit}
          cryptocurrencies={cryptocurrencies}
        />
      )}
      {alertData && (
        <Confirmation
          alertData={alertData}
          onModify={() => setAlertData(null)}
        />
      )}
    </div>
  );
}

export default App;
