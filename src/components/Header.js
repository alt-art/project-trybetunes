import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <AppBar position="static" data-testid="header-component">
        <Container maxWidth="md">
          <Toolbar>
            {user ? (
              <Typography variant="h6" color="inherit" sx={ { flexGrow: 1 } }>
                Olá
                {' '}
                { user.name }
              </Typography>
            ) : (
              <Typography variant="h6" color="inherit" sx={ { flexGrow: 1 } }>
                <Skeleton variant="rectangular" width={ 100 } height={ 30 } />
              </Typography>
            )}
            <Button>
              <Link data-testid="link-to-search" to="/search" style={{color: 'white'}}>
                Search
              </Link>
            </Button>
            <Button>
              <Link data-testid="link-to-favorites" to="/favorites" style={{color: 'white'}}>
                Favorites
              </Link>
            </Button>
            <Button>
              <Link data-testid="link-to-profile" to="/profile" style={{color: 'white'}}>
                Profile
              </Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default Header;
