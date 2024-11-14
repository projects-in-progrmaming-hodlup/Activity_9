// src/data/mockData.js
const mockCryptocurrencies = [
  {
    id: 1,
    name: "Bitcoin",
    market_cap: 800000000000,
    hourly_price: 45000,
    hourly_percentage: 0.5,
    time_updated: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Ethereum",
    market_cap: 350000000000,
    hourly_price: 3000,
    hourly_percentage: 0.8,
    time_updated: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Cardano",
    market_cap: 70000000000,
    hourly_price: 1.2,
    hourly_percentage: 1.0,
    time_updated: new Date().toISOString(),
  },
];

export default mockCryptocurrencies;

