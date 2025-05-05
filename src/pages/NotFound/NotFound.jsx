import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import notFoundImage from '../../assets/icons/404-image.svg'; // Your custom 404 image
import { LanguageContext } from '../../context/LanguageContext';

const NotFound = () => {
  const { translations: t } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        position: 'relative',
      
      }}
    >
      {/* Image with animation */}
      <motion.div
        style={{ marginBottom: '30px' }}
        animate={{ x: [0, 10, 0] }} // Move the image horizontally
        transition={{
          repeat: Infinity, // Repeat indefinitely
          duration: 3, // Duration of one cycle
          ease: 'easeInOut', // Smooth movement
        }}
      >
        <img src={notFoundImage} alt="Page Not Found" style={{ width: 'auto', height: 'auto' }} />
      </motion.div>

      {/* Error 404 text with fade-in effect */}
      <motion.div
        initial={{ opacity: 0 }} // Start with 0 opacity (invisible)
        animate={{ opacity: 1 }} // Fade in to full opacity
        transition={{ duration: 1 }} // Duration of fade-in
      >
        <Typography
          sx={{
            fontFamily: 'Almarai, sans-serif',
            fontWeight: 700,
            fontSize: '30px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textAlign: 'center',
            color: '#CFAE78',
            mb: 3,
          }}
        >
          {t.error404.title}
        </Typography>
      </motion.div>

      {/* Oops! Page not found text with slide-up effect */}
      <motion.div
        initial={{ y: 20, opacity: 0 }} // Start with slight translation and opacity 0
        animate={{ y: 0, opacity: 1 }} // Slide up and fade in
        transition={{ duration: 1, delay: 0.2 }} // Delay the animation slightly
      >
        <Typography
          sx={{
            fontFamily: 'Almarai, sans-serif',
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textAlign: 'center',
            color: '#FFFFFF',
            mb: '40px',
          }}
        >
          {t.error404.message}
        </Typography>
      </motion.div>

      {/* Button with scale-up animation */}
      <motion.div
        initial={{ scale: 0 }} // Start with 0 scale (invisible)
        animate={{ scale: 1 }} // Scale to full size
        transition={{ duration: 0.5, delay: 0.4 }} // Delay the animation slightly
      >
        <Button
          variant="contained"
          onClick={() => navigate('/')} // Navigate back to the home page
          sx={{
            width: { xs: '90%', sm: '240px', md: '378px' },
            height: 48,
            borderRadius: '5px',
            background: 'linear-gradient(90deg, #00395D 0%, #00395D 100%)',
            fontFamily: 'Almarai, sans-serif',
            fontWeight: 400,
            fontSize:  { xs: '14px', sm: '16px', md: '18px' },
            color: '#FFFFFF',
            textTransform: 'none',
          }}
        >
          {t.error404.button}
        </Button>
      </motion.div>
    </Box>
  );
};

export default NotFound;
