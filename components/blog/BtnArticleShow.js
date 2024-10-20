'use client'

import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import muiTheme from '@/lib/functions/mui_color_palets';  
import Link from 'next/link';

export default function BtnArticleShow({url}) {
  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ '& button': { m: 1 } }}>

        <Link href={`/novinky/${url}`}  passHref >

          <Button
            className='dark:text-gray-200 dark:bg-gray-700'
            variant="contained"
            color="primary"
            size="small"
            sx={{
              fontSize: '12px',  
              padding: '2px 6px',  
              minWidth: 'auto',  
            }}
          >
            podrobnosti
          </Button>
        </Link>

      </Box>
    </ThemeProvider>
  );
}
