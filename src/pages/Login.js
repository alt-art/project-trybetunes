import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      disabled: true,
      logged: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange = (event) => {
    const { value } = event.target;
    const MIN_LENGTH = 3;
    this.setState({
      username: value,
      disabled: value.length < MIN_LENGTH,
    });
  };

  submit() {
    const { username } = this.state;
    this.setState({ loading: true });
    createUser({ name: username }).then(() => {
      this.setState({ loading: false, logged: true });
    });
  }

  render() {
    const { username, disabled, loading, logged } = this.state;
    return logged ? (
      <Redirect to="/search" />
    ) : (
      <div data-testid="page-login">
        {!loading ? (
          <div>
            <input
              type="text"
              data-testid="login-name-input"
              placeholder="Username"
              value={ username }
              onChange={ this.handleChange }
            />
            <input
              type="button"
              data-testid="login-submit-button"
              value="Login"
              disabled={ disabled }
              onClick={ this.submit }
            />
          </div>
        ) : (
          <div>
            <p>Carregando...</p>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
