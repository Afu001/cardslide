import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignup) {
        // Sign up
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Log in
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/'); // Redirect to home page after successful auth
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Typography variant="h4" gutterBottom sx={styles.title}>
        {isSignup ? 'Sign Up' : 'Login'}
      </Typography>
      <Box component="form" onSubmit={handleAuth} sx={styles.form}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <Typography color="error" sx={styles.error}>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" fullWidth sx={styles.button}>
          {isSignup ? 'Sign Up' : 'Login'}
        </Button>
        <Typography sx={styles.toggleText}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <Link
            component="button"
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            sx={styles.toggleLink}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

const styles = {
  container: {
    marginTop: '4rem',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  form: {
    marginTop: '2rem',
  },
  button: {
    marginTop: '1rem',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    borderRadius: '8px',
  },
  error: {
    marginTop: '1rem',
  },
  toggleText: {
    marginTop: '1rem',
    color: 'white',
  },
  toggleLink: {
    color: '#21CBF3',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default Login;