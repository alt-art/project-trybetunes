import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

class Loading extends React.Component {
  render() {
    return (
      <Box
        sx={ {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        } }
      >
        <CircularProgress />
      </Box>
    );
  }
}

export default Loading;
