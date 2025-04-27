import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

// Success Popup Component
const SuccessPopup = ({ open, message, onClose }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#4CAF50', // Green for success
        padding: 3,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 9999,
        minWidth: '300px',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      {/* Success Icon */}
      <Typography variant="h4">✔️</Typography>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Typography sx={{ fontFamily: 'Almarai, sans-serif', fontWeight: 500, fontSize: '18px' }}>
          {message}
        </Typography>
      </motion.div>

      {/* Close Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="contained"
          sx={{
            mt: 2,
            width: '100%',
            height: 48,
            borderRadius: '5px',
            backgroundColor: '#fff',
            color: '#00395D',
            fontFamily: 'Almarai, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </motion.div>
    </Box>
  );
};

export default SuccessPopup;
