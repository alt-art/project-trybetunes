import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      disabled: true,
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
    const { history } = this.props;
    this.setState({ loading: true });
    createUser({ name: username }).then(() => {
      this.setState({ loading: false });
      history.push('/search');
    });
  }

  render() {
    const { username, disabled, loading } = this.state;
    return (
      <div>
        {!loading ? (
          <Box
            data-testid="page-login"
            sx={ {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            } }
          >
            <TextField
              type="text"
              data-testid="login-name-input"
              label="Username"
              value={ username }
              onChange={ this.handleChange }
              size="small"
              margin="normal"
            />
            <Button
              data-testid="login-submit-button"
              disabled={ disabled }
              onClick={ this.submit }
              size="large"
            >
              Login
            </Button>
          </Box>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
