'use client'

import Button from '@mui/material/Button';
import * as React from 'react';

export default function AddBtn({ handleAdd }) {
  return (
    <Button
      variant="outlined"
      onClick={handleAdd}
      sx={{
        backgroundColor: 'green',  
        color: 'white',  
        borderColor: 'darkgreen', 
        '&:hover': {
          backgroundColor: 'darkgreen',  
          borderColor: '#004d00',  
        }
      }}
    >
      Nová položka
    </Button>
  );
}
