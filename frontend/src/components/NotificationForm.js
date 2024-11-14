// frontend/src/components/NotificationForm.js
import React, { useState } from 'react';
import './NotificationForm.css';
import Button from './Button';
import Dropdown from './Dropdown';
import axios from 'axios';

const NotificationForm = ({ onSubmit, cryptocurrencies }) => {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptocurrencies[0]?.id || '');
  const [notificationType, setNotificationType] = useState('Price');
  const [thresholdValue, setThresholdValue] = useState('');
  const [notificationMethod, setNotificationMethod] = useState('Email');
  const [userId, setUserId] = useState(1); // For simplicity, using a hardcoded user ID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

  const handleSetAlert = async () => {
    if (!thresholdValue) {
      setError('Threshold value is required.');
      return;
    }

    const alertData = {
      user_id: userId,
      crypto_id: selectedCrypto,
      threshold_price: parseFloat(thresholdValue),
      notification_method: notificationMethod,
    };

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/alerts/`, alertData);
      console.log('Alert created:', response.data);
      onSubmit(alertData);
      setError(null);
    } catch (err) {
      console.error('Error setting alert:', err);
      setError('Setting alerts is not available at the moment.');
    } finally {
      setLoading(false);
    }
  };

  const selectedCryptoDetails = cryptocurrencies.find(
    (crypto) => crypto.id === selectedCrypto
  );

  return (
    <div className="notification-form">
      <h2>Set Notification</h2>

      {/* Dropdown for Cryptocurrency Selection */}
      <Dropdown
        label="Select Cryptocurrency:"
        options={cryptocurrencies.map((crypto) => ({
          value: crypto.id,
          label: crypto.name,
        }))}
        onSelect={setSelectedCrypto}
        selectedValue={selectedCrypto}
      />

      {/* Display Selected Cryptocurrency Details */}
      {selectedCryptoDetails && (
        <div className="crypto-details">
          <p>Market Cap: ${selectedCryptoDetails.market_cap.toLocaleString()}</p>
          <p>Hourly Price: ${selectedCryptoDetails.hourly_price}</p>
          <p>Hourly Percentage Change: {selectedCryptoDetails.hourly_percentage}%</p>
          <p>Last Updated: {new Date(selectedCryptoDetails.time_updated).toLocaleString()}</p>
        </div>
      )}

      {/* Dropdown for Notification Type */}
      <Dropdown
        label="Get notified by change in:"
        options={[
          { value: 'Price', label: 'Price' },
          { value: 'Percentage', label: 'Percentage' },
        ]}
        onSelect={setNotificationType}
        selectedValue={notificationType}
      />

      {/* Input for Threshold */}
      <div className="input-group">
        <label>Set Threshold</label>
        <input
          type="number"
          value={thresholdValue}
          onChange={(e) => setThresholdValue(e.target.value)}
          step="any"
          placeholder="Enter threshold value"
        />
      </div>

      {/* Dropdown for Notification Method */}
      <Dropdown
        label="Notification Method"
        options={[
          { value: 'Email', label: 'Email' },
          { value: 'SMS', label: 'SMS' },
          { value: 'Phone Call', label: 'Phone Call' },
          { value: 'Whatsapp', label: 'Whatsapp' },
          { value: 'Slack', label: 'Slack' },
          { value: 'Discord', label: 'Discord' },
        ]}
        onSelect={setNotificationMethod}
        selectedValue={notificationMethod}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Button
        text={loading ? 'Setting Alert...' : 'Set Alert!'}
        onClick={handleSetAlert}
        disabled={loading}
      />
    </div>
  );
};

export default NotificationForm;
