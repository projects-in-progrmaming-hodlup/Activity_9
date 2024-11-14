// src/components/Button.js
import React from 'react';
import './Button.css'; // Import CSS file

export default function Button({ text, onClick }) {
  return (
    <button className="custom-button" onClick={onClick}>
      {text}
    </button>
  );
}
