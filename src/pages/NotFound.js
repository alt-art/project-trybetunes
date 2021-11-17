import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

class NotFound extends React.Component {
  render() {
    return (
      <Container maxWidth="md" data-testid="page-not-found">
        <Typography variant="h1" gutterBottom>
          404
        </Typography>
        <Divider />
        <Typography variant="h2" gutterBottom>
          Page not found
        </Typography>
      </Container>
    );
  }
}

export default NotFound;
