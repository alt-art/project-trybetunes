import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getUser().then((user) => this.setState({
      user,
      loading: false,
    }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: { ...user, [name]: value },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    this.setState({ loading: true });
    const { user } = this.state;
    updateUser(user).then(() => history.push('/profile'));
  }

  validInput() {
    const { user } = this.state;
    const emailRegex = /.+@.+\..+/;
    return (
      !user.name
      || !user.email
      || !user.description
      || !user.image
      || !emailRegex.test(user.email)
    );
  }

  render() {
    const { loading, user } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
              Editar perfil
            </Typography>
            <div>
              <TextField
                type="text"
                name="name"
                data-testid="edit-input-name"
                label="Nome"
                value={ user.name }
                onChange={ this.handleChange }
                margin="normal"
              />
            </div>
            <div>
              <TextField
                type="email"
                name="email"
                data-testid="edit-input-email"
                label="E-mail"
                value={ user.email }
                onChange={ this.handleChange }
                margin="normal"
              />
            </div>
            <div>
              <TextField
                name="description"
                placeholder="Biografia"
                data-testid="edit-input-description"
                label="Biografia"
                multiline
                rows="3"
                value={ user.description }
                onChange={ this.handleChange }
                margin="normal"
              />
            </div>
            <div>
              <TextField
                type="text"
                name="image"
                data-testid="edit-input-image"
                label="Url da imagem de perfil"
                value={ user.image }
                onChange={ this.handleChange }
                margin="normal"
              />
            </div>
            <Button
              data-testid="edit-button-save"
              onClick={ this.handleSubmit }
              disabled={ this.validInput() }
            >
              Salvar Informações
            </Button>
          </Container>
        )}
      </div>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
