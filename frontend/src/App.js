import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Files from './components/Files';
import Login from './components/Login';
import Register from './components/Register';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  useEffect(()=>{
    const token = sessionStorage.getItem('token') || null;
  
    if (!token) {
      navigate('/');
      return;
    }

    navigate('/files');
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path="/files" element={<Files />} />
    </Routes>
  );
}

export default App;
