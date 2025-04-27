
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import notFoundImage from '../../assets/icons/404-image.svg'; // Your custom 404 image

const NotFound = () => {
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
      {/* Image at the top */}
      <Box sx={{ marginBottom: 3 }}>
        <img src={notFoundImage} alt="Page Not Found" style={{ width: 'auto', height: 'auto' }} />
      </Box>
      
      {/* Error 404 text */}
      <Typography
        sx={{
          fontFamily: 'Almarai, sans-serif',
          fontWeight: 700,
          fontSize: '30px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'center',
          color: '#CFAE78',
          mb:3
        }}
      >
        Error 404
      </Typography>
      
      {/* Oops! Page not found */}
      <Typography
        sx={{
          fontFamily: 'Almarai, sans-serif',
          fontWeight: 400,
          fontSize: '24px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'center',
          color: '#FFFFFF',
        
          mb:"40px"
        }}
      >
        Oops! Page Not Found
      </Typography>
      
      {/* Button to navigate back to the homepage */}
      <Button
        variant="contained"
        onClick={() => navigate('/')} // Navigate back to the home page
        sx={{
          // width: 378,
          width: { xs: "90%", sm: "240px", md: "378px" },
          height: 48,
          borderRadius: '5px',
          background: 'linear-gradient(90deg, #00395D 0%, #00395D 100%)',
          fontFamily: 'Almarai, sans-serif',
          fontWeight: 400,
          fontSize: '18px',
          color: '#FFFFFF',
        
          textTransform: 'none',
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
