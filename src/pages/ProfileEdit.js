import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

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
          <p>Carregando...</p>
        ) : (
          <form>
            <div>
              <label htmlFor="name">
                <p>Nome</p>
                <input
                  type="text"
                  name="name"
                  data-testid="edit-input-name"
                  placeholder="Nome"
                  value={ user.name }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                <p>Email</p>
                <input
                  type="text"
                  name="email"
                  data-testid="edit-input-email"
                  placeholder="E-mail"
                  value={ user.email }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <div>
              <label htmlFor="description">
                <p>Descrição</p>
                <textarea
                  name="description"
                  placeholder="Biografia"
                  data-testid="edit-input-description"
                  value={ user.description }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <div>
              <label htmlFor="image">
                <p>Imagem</p>
                <input
                  type="text"
                  name="image"
                  data-testid="edit-input-image"
                  placeholder="Url da imagem de perfil"
                  value={ user.image }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <button
              type="submit"
              data-testid="edit-button-save"
              onClick={ this.handleSubmit }
              disabled={ this.validInput() }
            >
              Salvar Informações
            </button>
          </form>
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
