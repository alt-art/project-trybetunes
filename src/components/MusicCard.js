import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

class MusicCard extends React.Component {
  render() {
    const { title, src, trackId, handleChange, isFavorite, image } = this.props;
    return (
      <Card
        sx={ {
          display: 'flex',
          margin: 1,
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
        } }
      >
        <CardMedia
          component="img"
          image={ image }
          alt={ title }
          sx={ {
            width: 226,
            height: 226,
          } }
        />
        <Box
          sx={ {
            display: 'flex',
            flexDirection: 'column',
          } }
        >
          <CardContent>
            <Typography variant="h6" component="h2">
              { title }
            </Typography>
            <audio src={ src } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
          </CardContent>
          <CardActions>
            <Checkbox
              data-testid={ `checkbox-music-${trackId}` }
              checked={ isFavorite }
              id={ `${trackId}` }
              onChange={ handleChange }
              icon={ <FavoriteBorderIcon /> }
              checkedIcon={ <FavoriteIcon /> }
            />
          </CardActions>
        </Box>
      </Card>
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
  image: PropTypes.string.isRequired,
};
