import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Card, CardContent, Typography, Container, Box } from '@mui/material';

const SavedCards = () => {
  const [savedCards, setSavedCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedCards = async () => {
      if (auth.currentUser) {
        const q = query(
          collection(db, 'savedCards'),
          where('userId', '==', auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const cards = querySnapshot.docs.map((doc) => doc.data());
        setSavedCards(cards);
        setLoading(false);
      }
    };
    fetchSavedCards();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={styles.container}>
        <Typography variant="h6">Loading saved cards...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Typography variant="h4" gutterBottom sx={styles.title}>
        Saved Cards
      </Typography>
      {savedCards.length === 0 ? (
        <Typography variant="body1">No cards saved yet.</Typography>
      ) : (
        savedCards.map((card, index) => (
          <Card key={index} sx={styles.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {card.card.title}
              </Typography>
              <Typography variant="body1">{card.card.content}</Typography>
              <Typography variant="caption" color="textSecondary">
                Saved on: {new Date(card.savedAt?.toDate()).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
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
    marginBottom: '2rem',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    marginBottom: '1rem',
  },
};

export default SavedCards;