'use client'

import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import { useTheme as useNextTheme } from 'next-themes';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { createTheme, ThemeProvider} from '@mui/material';

export default function PassField() {
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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={resolvedTheme === 'light' ? lightTheme : darkTheme}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
    </ThemeProvider>
  );
}
