import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { title, src, trackId, handleChange, isFavorite } = this.props;
    return (
      <div>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            checked={ isFavorite }
            onChange={ handleChange }
          />
          Favorita
        </label>
        <h3>{ title }</h3>
        <audio data-testid="audio-component" src={ src } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento]
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
  handleChange: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
