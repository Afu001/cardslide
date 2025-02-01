import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CardSlider from '../components/CardSlider';
import InterestSelection from '../components/InterestSelection';
import { Box, Typography } from '@mui/material';
import { SwipeLeft, SwipeRight } from '@mui/icons-material';
import './Butterflies.css'; // Import the CSS file for animation

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [interests, setInterests] = useState([]);

  // If interests are not selected, show the InterestSelection component
  if (interests.length === 0) {
    return (
      <Box sx={styles.container}>
        <Typography variant="h4" gutterBottom sx={styles.gradientText}>
          Welcome, {currentUser?.email}!
        </Typography>
        <InterestSelection onComplete={(selectedInterests) => setInterests(selectedInterests)} />
      </Box>
    );
  }

  // If interests are selected, show the CardSlider component
  return (
    <Box sx={styles.container}>
      <div className="butterfly-container"> {/* Butterfly effect wrapper */}
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="butterfly"></div>
        ))}
      </div>
      
      <Typography variant="h4" gutterBottom sx={styles.gradientText}>
        <SwipeLeft sx={{ fontSize: 40, color: '#ff6b81' }} /> Swipe Left | Swipe Right <SwipeRight sx={{ fontSize: 40, color: '#5ac8fa' }} />
      </Typography>
      
      <CardSlider interests={interests} />
    </Box>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  gradientText: {
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #ff6b81, #be0aff, #5ac8fa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '2rem',
  },
};

export default Dashboard;
