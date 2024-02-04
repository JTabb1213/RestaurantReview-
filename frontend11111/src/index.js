import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import DisplayPage from './pages/DisplayPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReviewPage from './pages/ReviewPage';
import BadLoginPage from './pages/BadLoginPage';
import LogoutPage from './pages/LogoutPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/displaypage" element={<DisplayPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reviewpage" element={<ReviewPage />} />
        <Route path="/needtologin" element={<BadLoginPage />} />
        <Route path="/logoutpage" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
