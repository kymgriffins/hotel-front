import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Carousel } from 'react-material-ui-carousel';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function RoomDetailsComp({ room_number, price, description, max_occupancy, availability, room_type, image}) {
  const imageURL = "https://res.cloudinary.com/dj9cp8xcv/";
  const firstImage = image.length > 0 ? image[0].image : null;
  console.log("IMG", image)

  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardHeader
        title={room_type}
      />
      
      
          <CardMedia
          component="img"
          height="400"
          image={firstImage ? imageURL + firstImage : "https://via.placeholder.com/150"}
          alt={room_number}
        />

   
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Room Number: {room_number}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Occupancy: {max_occupancy}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Availability: {availability}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RoomDetailsComp;
