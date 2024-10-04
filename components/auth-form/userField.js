'use client';

import * as React from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { MdOutlineMailLock } from "react-icons/md";
import { createTheme, ThemeProvider, Box, TextField, InputAdornment } from '@mui/material';

export default function UserField({handleChange, error}) {
  const { resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }



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

  return (
    <ThemeProvider theme={resolvedTheme === 'light' ? lightTheme : darkTheme}>
      <Box
        
        sx={{ '& > :not(style)': { m: 1, width: '280px' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="user"
          error={error}
          color="primary"
          autoComplete='username'
          onChange={(e)=>handleChange(e, 'user')}
          label="Email"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <MdOutlineMailLock className="w-6 h-6" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
