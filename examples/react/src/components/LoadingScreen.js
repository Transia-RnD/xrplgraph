import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box, LinearProgress } from '@mui/material';

function LoadingScreen() {

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div sx={{
      alignItems: 'center',
      backgroundColor: (theme) => theme.palette.background.default,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      minHeight: '100%',
      padding: 3
    }}>
      <Box width={400}>
        <LinearProgress />
      </Box>
    </div>
  );
}

export default LoadingScreen;
