import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Auth from './auth';
import Dashboard from './dashboard';
import './index.css';
import './ShipporiAntique-Regular.ttf'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);