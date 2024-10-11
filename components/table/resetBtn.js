'use client'

import Button from '@mui/material/Button';
import * as React from 'react';

export default function ResetBtn({ handleReset }) {
  return (
    <Button
      variant="outlined"
      onClick={handleReset}
      sx={{
        color: 'black', 
        borderColor: '#808080', 
        '&:hover': {
          borderColor: '#606060', 
        }
      }}
    >
      Resetovat filtr
    </Button>
  );
}
