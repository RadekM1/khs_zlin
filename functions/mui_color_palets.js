import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#e0e0e0',  
      contrastText: '#212121',  
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#555555',
          fontWeight: '',
          borderRadius: '5px',
        },
      },
    },
  },
});

export default muiTheme;
