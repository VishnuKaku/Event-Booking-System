// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EventBooking from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <EventBooking />
  </React.StrictMode>
);