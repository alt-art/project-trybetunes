import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      disabled: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { value } = event.target;
    const MIN_LENGTH = 2;
    this.setState({
      input: value,
      disabled: value.length < MIN_LENGTH,
    });
  }

  render() {
    const { input, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          disabled={ disabled }
        />
      </div>
    );
  }
}

export default Search;
