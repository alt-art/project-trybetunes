import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import {
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.favoriteSongs = this.favoriteSongs.bind(this);
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  handleChange(event) {
    const { id } = event.target;
    const { favoriteSongs } = this.state;
    const music = favoriteSongs.find(
      (song) => song.trackId === parseInt(id, 10),
    );
    this.setState({ loading: true });
    removeSong(music).then(this.favoriteSongs);
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
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
              Suas músicas favoritas
            </Typography>
            {favoriteSongs.length === 0 ? (
              <Typography variant="h6" gutterBottom>
                Você não possui músicas favoritas
              </Typography>
            ) : (
              favoriteSongs.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  title={ song.trackName }
                  image={ song.artworkUrl100 }
                  src={ song.previewUrl }
                  trackId={ song.trackId }
                  handleChange={ this.handleChange }
                  isFavorite
                />
              ))
            )}
          </Container>
        )}
      </div>
    );
  }
}

export default Favorites;
