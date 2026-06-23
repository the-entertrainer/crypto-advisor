import React from 'react';
import ReactDOM from 'react-dom/client';
import { MarketProvider } from './context/MarketContext';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MarketProvider>
      <App />
    </MarketProvider>
  </React.StrictMode>
);
