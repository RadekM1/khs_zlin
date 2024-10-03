'use client'

import * as React from 'react';
import { useTheme as useNextTheme } from 'next-themes';


import { createTheme, ThemeProvider, Box, TextField } from '@mui/material';

export default function UserField() {
  const { resolvedTheme} = useNextTheme();

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#e8975f',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#f2c2a2',
      },
    },
  });


  return (
    <ThemeProvider theme={resolvedTheme === 'light' ? lightTheme : darkTheme}>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField id="filled-basic" error={false} color="primary" label="Outlined" />
      </Box>
    </ThemeProvider>
  );
}
