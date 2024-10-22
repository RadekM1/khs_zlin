import * as React from 'react';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme as useNextTheme } from 'next-themes';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material';

export default function PassField({ handleChange, label, id, size, error }) {
  const { resolvedTheme } = useNextTheme();
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

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={resolvedTheme === 'light' ? lightTheme : darkTheme}>
      <FormControl sx={{ m: 1, width: '280px' }} variant="outlined">
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          id={id}
          error={error}
          type={showPassword ? 'text' : 'password'}
          size={size ? size : 'normal'}
          autoComplete="current-password"
          onChange={(e) => handleChange(e, id)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>
    </ThemeProvider>
  );
}
