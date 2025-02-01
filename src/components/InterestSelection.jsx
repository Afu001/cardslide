import { useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';

const interestsList = [
  'Science', 'Technology', 'History', 'Art', 'Geography',
  'Mathematics', 'Literature', 'Physics', 'Biology', 'Astronomy'
];

const InterestSelection = ({ onComplete }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" gutterBottom sx={styles.title}>
        Select Your Interests
      </Typography>
      <Grid container spacing={2}>
        {interestsList.map((interest) => (
          <Grid item xs={6} sm={4} key={interest}>
            <Button
              variant={selectedInterests.includes(interest) ? 'contained' : 'outlined'}
              onClick={() => toggleInterest(interest)}
              sx={{
                ...styles.button,
                background: selectedInterests.includes(interest)
                  ? 'linear-gradient(45deg, rgb(125, 76, 175) 30%, rgb(195, 129, 199) 90%)'
                  : 'transparent',
                color: selectedInterests.includes(interest) ? '#fff' : '#be0aff',
              }}
              fullWidth
            >
              {interest}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        size="large"
        sx={styles.continueButton}
        onClick={() => onComplete(selectedInterests)}
        disabled={selectedInterests.length === 0}
      >
        Continue
      </Button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem'
  },
  title: {
    color: '#be0aff',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  button: {
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    height: '60px',
    border: '2px solidrgb(231, 167, 255)'
  },
  continueButton: {
    marginTop: '2rem',
    background: 'linear-gradient(45deg, rgb(125, 76, 175) 30%, rgb(195, 129, 199) 90%)',
    borderRadius: '8px',
    float: 'right'
  }
};

export default InterestSelection;
