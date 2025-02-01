import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SavedCards from './pages/SavedCards';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute'; // Correct import

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/saved" element={<SavedCards />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;