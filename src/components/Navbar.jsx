import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div" sx={styles.title}>
            A S W A D
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/saved">
            Saved Cards
          </Button>
          {currentUser ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const styles = {
  appBar: {
    background: 'linear-gradient(45deg, #00b4d8, #fb6f92)', // Dark opaque peach (using rgba for opacity)
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 183, 171, 0.5)',
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    color: '#2d2d2d', // Darker color for contrast
  },
};

export default Navbar;
