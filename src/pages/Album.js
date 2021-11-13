import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
    } = props;
    this.state = {
      id: params.id,
      musics: [],
    };
  }

  componentDidMount() {
    const { id } = this.state;
    getMusics(id).then((musics) => {
      this.setState({
        musics,
      });
    });
  }

  render() {
    const { musics } = this.state;
    return musics.length !== 0 ? (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ musics[0].artistName }</h1>
        <h2 data-testid="album-name">{ musics[0].collectionName }</h2>
        {musics.map(
          (music) => music.trackName && (
            <MusicCard
              key={ music.trackId }
              title={ music.trackName }
              src={ music.previewUrl }
              trackId={ music.trackId }
            />
          ),
        )}
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
