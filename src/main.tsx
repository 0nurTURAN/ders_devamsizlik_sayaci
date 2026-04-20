import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // app.tsx dosyasını import eder
import './styles/App.css'; // Stil dosyanı import eder

// React'i HTML içerisindeki "root" id'li div'e bağlar
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);