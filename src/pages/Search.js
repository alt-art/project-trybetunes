import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

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
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <Container maxWidth="md">
              <Box
                sx={ {
                  display: 'flex',
                  alignItems: 'center',
                  margin: '10px',
                } }
              >
                <TextField
                  type="text"
                  data-testid="search-artist-input"
                  label="Search"
                  value={ input }
                  onChange={ this.handleInputChange }
                  size="small"
                />
                <IconButton
                  data-testid="search-artist-button"
                  onClick={ this.handleClick }
                  disabled={ disabled }
                >
                  <SearchIcon />
                </IconButton>
              </Box>
              <Box
                sx={ {
                  margin: '10px',
                } }
              >
                <Typography variant="subtitle2">{ message }</Typography>
                <Box>
                  {artists.map((artist, index) => (
                    <Card
                      key={ index }
                      sx={ {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                        margin: 2,
                        border: '1px solid #e0e0e0',
                        boxShadow: 'none',
                      } }
                    >
                      <Box
                        key={ artist.id }
                        sx={ {
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                        } }
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            component="div"
                            key={ artist.collectionId }
                          >
                            <Link
                              key={ artist.collectionId }
                              to={ `/album/${artist.collectionId}` }
                              data-testid={ `link-to-album-${artist.collectionId}` }
                            >
                              { artist.collectionName }
                            </Link>
                          </Typography>
                          <Typography variant="subtitle1">
                            { artist.artistName }
                          </Typography>
                        </CardContent>
                      </Box>
                      <CardMedia
                        sx={ { width: 226, height: 226 } }
                        key={ artist.id }
                        component="img"
                        alt={ artist.collectionName }
                        height="140"
                        image={ artist.artworkUrl100 }
                      />
                    </Card>
                  ))}
                </Box>
              </Box>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
