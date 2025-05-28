import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { MdWarningAmber } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";

const RoomNotOccupiedPage = () => {
  const navigate = useNavigate();
    const { translations: t, language } = useContext(LanguageContext);
  const theme = useTheme();
  const controls = useAnimation();
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    document.title = "Room Not Occupied";

    const pulseAnimation = async () => {
      while (isPulsing) {
        await controls.start({
          color: ["#0288d1", "#26c6da", "#0288d1"], // blue–teal pulse
          transition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
        });
      }
    };

    pulseAnimation();

    return () => setIsPulsing(false);
  }, [isPulsing, controls]);

  return (
    <Box
      component="main"
      sx={{
        // minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        px: 2,
        py: 4,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[100]} 100%)`,
          zIndex: -1,
          animation: "gradientShift 15s ease infinite",
          backgroundSize: "200% 200%",
        },
        "@keyframes gradientShift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: -20 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
          rotate: [0, -5, 5, -5, 5, 0],
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 1,
          rotate: { delay: 0.5, duration: 0.8 },
        }}
        style={{ marginBottom: "2rem" }}
        aria-hidden="true"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            transition: { duration: 2, repeat: Infinity },
          }}
        >
          <MdWarningAmber
            size={120}
            style={{ display: "block", color: "#0288d1" }} // changed to blue tone
            aria-label="Warning icon"
          />
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
        <motion.div animate={controls}>
          <Typography
            variant="h3"
            fontWeight={700}
            mb={2}
            component="h1"
            sx={{
              textShadow: `0 2px 4px rgba(0,0,0,0.1)`,
            }}
          >
            {t.roomNotOccupiedTitle || "Room Not Occupied"}
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }}>
          <Typography
            variant="body1"
            color="text.secondary"
            maxWidth="500px"
            mb={4}
            fontSize="1.1rem"
            lineHeight={1.6}
            sx={{
              backdropFilter: "blur(2px)",
              padding: 2,
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.7)",
            }}
          >
            {t.roomNotOccupiedMessage || "It seems that the room you are trying to access is not currently occupied. Please check your room number or contact the reception for assistance."}
          </Typography>
        </motion.div>

      
      </motion.div>
    </Box>
  );
};

export default RoomNotOccupiedPage;
