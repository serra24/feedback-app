import React, { useContext } from 'react';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import { LanguageContext } from '../../context/LanguageContext';
import worldIcon from '../../assets/icons/world.png';
import saFlag from '../../assets/icons/sa-flag.png'; // Saudi Arabia flag
import usFlag from '../../assets/icons/us-flag.png'; // USA flag

const LanguageSelector = () => {
  const { language, setLanguage, translations: t } = useContext(LanguageContext);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value); // Update language context
  };

  // Dynamically set margin based on the language (LTR or RTL)
  const isRtl = language === 'ar'; // Example: "ar" is for Arabic (RTL)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <img src={worldIcon} alt="Language Icon" style={{ width: 18, height: 18 }} />
      <FormControl variant="standard" sx={{ minWidth: 100 }}>
        <Select
          value={language}
          onChange={handleLanguageChange}
          disableUnderline
          sx={{
            color: 'var(--gold-color)',
            fontWeight: 400,
            fontSize: 14,
            '& .MuiSvgIcon-root': { color: 'var(--gold-color)' },
          }}
          renderValue={(selected) => {
            // Render only the language name without the flag when the dropdown is closed
            if (selected === 'en') {
              return t.language.english;
            }
            if (selected === 'ar') {
              return t.language.arabic;
            }
            return selected;
          }}
        >
          {/* Dropdown options with flags */}
          <MenuItem value="en">
            <img
              src={usFlag} // Flag for language option
              alt="English Flag"
              style={{
                width: 20,
                height: 20,
                marginRight: isRtl ? 0 : 8,  // Apply left margin if LTR
                marginLeft: isRtl ? 8 : 0,    // Apply right margin if RTL
              }}
            />
            {t.language.english}
          </MenuItem>
          <MenuItem value="ar">
            <img
              src={saFlag} // Flag for language option
              alt="Arabic Flag"
              style={{
                width: 20,
                height: 20,
                marginRight: isRtl ? 0 : 8,  // Apply left margin if LTR
                marginLeft: isRtl ? 8 : 0,    // Apply right margin if RTL
              }}
            />
            {t.language.arabic}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
