import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { title, src } = this.props;
    return (
      <div>
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
};
