'use client'

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function SpinnerBigOrange () {
    return (


        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginX: 1
            
            }}>
            <CircularProgress size={40} sx={{color: 'orange'}} />
        </Box>


    )
}