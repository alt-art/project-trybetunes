import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { trackId } = this.props;
    const { isFavorite } = this.state;
    if (!isFavorite) {
      this.setState({ isFavorite: true });
      addSong(trackId);
    } else {
      this.setState({ isFavorite: false });
    }
  }

  render() {
    const { title, src, trackId } = this.props;
    const { isFavorite } = this.state;
    return (
      <div>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            checked={ isFavorite }
            onChange={ this.handleChange }
          />
          Favorita
        </label>
        <h3>{ title }</h3>
        <audio data-testid="audio-component" src={ src } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
