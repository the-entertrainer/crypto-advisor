import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MarketProvider } from './context/MarketContext';
import App from './App';
import './styles/index.css';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(MarketProvider, { children: _jsx(App, {}) }) }));
