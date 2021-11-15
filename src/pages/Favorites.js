import React from 'react';
import Header from '../components/Header';
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
          <p>Carregando...</p>
        ) : (
          <div className="favorites">
            <h2>Suas músicas favoritas</h2>
            {favoriteSongs.length === 0 ? (
              <p>Nenhuma música adicionada aos favoritos</p>
            ) : (
              favoriteSongs.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  title={ song.trackName }
                  src={ song.previewUrl }
                  trackId={ song.trackId }
                  handleChange={ this.handleChange }
                  isFavorite
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
