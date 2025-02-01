import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCardContent } from '../utils/gemini';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CardSlider = ({ interests }) => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      const generatedCards = [];
      for (let i = 0; i < 10; i++) {
        const topic = interests[Math.floor(Math.random() * interests.length)];
        try {
          const content = await generateCardContent(topic);
          generatedCards.push({
            id: i,
            title: (
              <>
                Fact about{' '}
                <span style={styles.gradientText}>{topic}</span>
              </>
            ),
            content,
            category: topic,
          });
          await sleep(1000);
        } catch (error) {
          console.error(`Error generating card ${i + 1}:`, error);
          generatedCards.push({
            id: i,
            title: (
              <>
                Fact about{' '}
                <span style={styles.gradientText}>{topic}</span>
              </>
            ),
            content: 'Failed to generate content. Please try again.',
            category: topic,
          });
        }
      }
      setCards(generatedCards);
      setLoading(false);
    };
    fetchCards();
  }, [interests]);

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          style={styles.cardContainer}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(event, info) => {
            if (info.offset.x < -50) {
              setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1)); // Swipe left
            } else if (info.offset.x > 50) {
              setCurrentIndex((prev) => Math.max(prev - 1, 0)); // Swipe right
            }
          }}
        >
          <Card sx={styles.card}>
            <CardContent>
              <Typography variant="h3" gutterBottom sx={styles.title}>
                {cards[currentIndex]?.title}
              </Typography>
              <Typography variant="body1" sx={styles.content}>
                {cards[currentIndex]?.content}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

const styles = {
  container: {
    position: 'relative',
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardContainer: {
    position: 'absolute',
    width: '100%',
    cursor: 'grab',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.4)', // White opaque background
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    maxWidth: '600px',
    margin: '0 auto',
    minHeight: '400px',
  },
  title: {
    fontFamily: 'Poppins, sans-serif', // Custom font (Poppins) for bold and large title
    fontWeight: 'bold',
    fontSize: '3rem', // Make title larger
    color: 'rgba(91, 91, 91, 0.91)', // Dark color for title
  },
  gradientText: {
    background: 'linear-gradient(90deg,rgb(228, 51, 255),rgb(187, 51, 255),rgb(136, 0, 255))', // Orange to Gold gradient
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
  },
  content: {
    fontFamily: 'Roboto, sans-serif', // Regular font for content
    fontSize: '1.2rem', // Slightly larger font for better readability
    color: '#444444  ', // Dark color for content
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  },
};

export default CardSlider;
