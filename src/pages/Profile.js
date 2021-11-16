import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      console.log(user);
      this.setState({ user });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <p>
          <Link to="/profile/edit">Editar perfil</Link>
        </p>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div>
            <img data-testid="profile-image" src={ user.image } alt={ user.name } />
            <h1>{ user.name }</h1>
            <h2>{ user.email }</h2>
            <p>{ user.description }</p>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
