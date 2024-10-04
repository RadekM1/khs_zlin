'use client';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useState, useEffect } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import { createTheme, ThemeProvider, Box, TextField } from '@mui/material';

export default function InputField({ dataIn, widthInput, id, label, error, size, helperText, handleChange }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#a3a29e',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#dedbd7',
      },
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={resolvedTheme === 'light' ? lightTheme : darkTheme}>
      <Box
        component="div" // Změněno z form na div, aby nedošlo k vnoření form elementů
        sx={{
          '& > :not(style)': {
            m: 1,
            width: widthInput ? `${widthInput}px` : '230px',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id={id}
          error={error}
          color="primary"
          label={label}
          value={dataIn}
          onChange={(e) => handleChange(e, id)}
          size={size ? size : 'normal'}
        />
        <FormHelperText className="text-center" id="component-helper-text">
          {helperText ? helperText : undefined}
        </FormHelperText>
      </Box>
    </ThemeProvider>
  );
}
