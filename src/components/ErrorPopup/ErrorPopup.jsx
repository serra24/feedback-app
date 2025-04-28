import React, { useContext, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import error from '../../assets/icons/error-icon.svg'; // Your custom error icon
import CloseIcon from '@mui/icons-material/Close'; // Material-UI Close Icon
import { LanguageContext } from "../../context/LanguageContext";

// Error Popup Component
const ErrorPopup = ({ open, message, onClose }) => {
    const { translations: t } = useContext(LanguageContext);
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: "linear-gradient(180deg, #00395D 0%, #13537C 100%)",
        padding: 3,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 9999,
        minWidth: { xs: "75%", md: "300px" },
        height: 'auto',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      {/* Close Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          cursor: 'pointer',
        }}
        onClick={onClose}
      >
        <CloseIcon sx={{ color: '#fff', fontSize: '24px' }} />
      </Box>

      {/* Error Icon */}
      <Box
        component="img"
        src={error}
        sx={{ width: {md:"50px",xs:"35px"}, height: {md:"50px",xs:"35px"}, marginBottom:{md:"20px",xs:"10px"} }}
      />
      {/* <img
        src={error}
        alt="Error Icon"
        style={{ width: '50px', height: '50px', marginBottom: '20px' }}
      /> */}

      {/* Error Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
       <Typography sx={{ fontWeight: 700, fontSize: {md:"20px",xs:"16px"} }}>
         {t.errorhappen}
        </Typography>
      </motion.div>

      {/* Error Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Typography sx={{  fontWeight: 400, fontSize: '18px' }}>
          {message}
        </Typography>
      </motion.div>

      {/* Close Button */}
      {/* <motion.div
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
      </motion.div> */}
    </Box>
  );
};

export default ErrorPopup;
