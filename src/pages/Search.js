import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      disabled: true,
      loading: false,
      message: '',
      artists: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event) {
    const { value } = event.target;
    const MIN_LENGTH = 2;
    this.setState({
      input: value,
      disabled: value.length < MIN_LENGTH,
    });
  }

  handleClick() {
    const { input } = this.state;
    this.setState({
      input: '',
      disabled: true,
      loading: true,
    });
    searchAlbumsAPI(input).then((data) => {
      if (data.length === 0) {
        this.setState({
          message: 'Nenhum álbum foi encontrado',
        });
      } else {
        this.setState({
          message: `Resultado de álbuns de: ${input}`,
          artists: data,
        });
      }
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { input, disabled, loading, message, artists } = this.state;
    return !loading ? (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Search"
            value={ input }
            onChange={ this.handleInputChange }
          />
          <input
            type="button"
            value="Search"
            data-testid="search-artist-button"
            onClick={ this.handleClick }
            disabled={ disabled }
          />
        </div>
        <div>
          <p>{message}</p>
          {artists.map((artist) => (
            <p key={ artist.collectionId }>
              <Link
                key={ artist.collectionId }
                to={ `/album/${artist.collectionId}` }
                data-testid={ `link-to-album-${artist.collectionId}` }
              >
                { artist.collectionName }
              </Link>
            </p>
          ))}
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default Search;
