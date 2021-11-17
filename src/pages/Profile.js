import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: true,
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({ user, loading: false });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <Container maxWidth="md">
          {loading ? (
            <Loading />
          ) : (
            <div>
              <Avatar
                sx={ {
                  width: '100px',
                  height: '100px',
                  marginTop: 3,
                } }
                data-testid="profile-image"
                src={ user.image }
                alt={ user.name }
              />
              <Typography variant="h4" gutterBottom>
                { user.name }
              </Typography>
              <Typography variant="h6" gutterBottom>
                { user.email }
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                { user.description }
              </Typography>
              <Button>
                <Link to="/profile/edit">Editar perfil</Link>
              </Button>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default Profile;
