import React from 'react';
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
      <header data-testid="header-component" className="header">
        {user ? (
          <p data-testid="header-user-name">{user.name}</p>
        ) : (
          <p>Carregando...</p>
        )}
      </header>
    );
  }
}

export default Header;
