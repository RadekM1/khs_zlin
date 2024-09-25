'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';


export default function ImgBtnNav({data}) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: '100%', width: '100%' }}>
      
        
        <ButtonBase
          focusRipple
          key={data.id}
          sx={{
            position: 'relative',
            height: 100,
            width: '100%',
            '&:hover, &.Mui-focusVisible': {
              zIndex: 1,
              '& .MuiImageBackdrop-root': {
                opacity: 0.4,
              },
              '& .MuiImageMarked-root': {
                opacity: 0,
              },
              '& .MuiTypography-root': {
                border: '2x solid currentColor',
              },
            },
            '@media (max-width: 600px)': {
              width: '100% !important',
              height: 100,
            },
          }}
        >
          <Box
            component="span"
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              backgroundImage: `url(${data.img})`,
            }}
          />
          <Box
            component="span"
            className="MuiImageBackdrop-root"
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: '#3B3B3B',
              opacity: 0.7,
              transition: 'opacity 0.3s',
            }}
          />
          <Box
            component="span"
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'common.white',
            }}
          >
            <Typography
              component="span"
              variant="title"
              color="inherit"
              sx={{
                position: 'relative',
                p: 1,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                fontSize: '24px',
                fontWeight: 'bold',
               
              }}
            >
              {data.title}
              <Box
                component="span"
                className="MuiImageMarked-root"
                sx={{
                  height: 3,
                  width: 18,
                  backgroundColor: 'common.white',
                  position: 'absolute',
                  bottom: -2,
                  left: 'calc(50% - 9px)',
                  transition: 'opacity 0.3s',
                }}
              />
            </Typography>
          </Box>
        </ButtonBase>
      
    </Box>
  );
}
