'use client'

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner () {
    return (


        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            margin: 2
            
            }}>
            <CircularProgress size={20} sx={{color: 'orange'}} />
        </Box>


    )
}