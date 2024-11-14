// src/components/Dropdown.js
import React from 'react';
import './Dropdown.css';

const Dropdown = ({ label, options, onSelect, selectedValue }) => {
  return (
    <div>
      <label>{label}</label>
      <select value={selectedValue} onChange={(e) => onSelect(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
