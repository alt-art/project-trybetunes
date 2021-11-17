import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import {
  getFavoriteSongs,
  addSong,
  removeSong,
} from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
    } = props;
    this.state = {
      id: params.id,
      musics: [],
      favoriteSongs: [],
      loading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.favoriteSongs = this.favoriteSongs.bind(this);
  }

  componentDidMount() {
    const { id } = this.state;
    getMusics(id).then((musics) => {
      this.setState({
        musics,
      });
      this.favoriteSongs();
    });
  }

  handleChange(event) {
    const { checked, id } = event.target;
    const { musics } = this.state;
    const music = musics.find((song) => song.trackId === parseInt(id, 10));
    this.setState({ loading: true });
    if (checked) {
      addSong(music).then(this.favoriteSongs);
    } else {
      removeSong(music).then(this.favoriteSongs);
    }
  }

  cancelLoading() {
    this.setState({ loading: false });
  }

  favoriteSongs() {
    getFavoriteSongs().then((favoriteSongs) => {
      this.setState({ favoriteSongs }, this.cancelLoading);
    });
  }

  render() {
    const { musics, favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <Container maxWidth="md" fixed>
            <Typography data-testid="album-name" variant="h4" gutterBottom>
              { musics[0].collectionName }
            </Typography>
            <Typography data-testid="artist-name" variant="h5" gutterBottom>
              { musics[0].artistName }
            </Typography>
            {musics.map(
              (music) => music.trackName && (
                <MusicCard
                  key={ music.trackId }
                  title={ music.trackName }
                  src={ music.previewUrl }
                  trackId={ music.trackId }
                  image={ music.artworkUrl100 }
                  handleChange={ this.handleChange }
                  // Ajuda secreta do Gustavo Meira:
                  // https://github.com/tryber/sd-016-a-project-trybetunes/pull/8/files#diff-a24a919e1af447a053f1189e7d95d4e5f4fbedd776afe9d78969271735dba522R96
                  isFavorite={ favoriteSongs.some(
                    (song) => song.trackId === music.trackId,
                  ) }
                />
              ),
            )}
          </Container>
        )}
      </div>
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
