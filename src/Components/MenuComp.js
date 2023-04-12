import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,CardActions , Button } from '@mui/material';
const MenuComponent = ({name, price, image, description}) => {
  const imageURL = "https://res.cloudinary.com/dj9cp8xcv/";
  const firstImage = image.length > 0 ? image[0].image : null;
  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardActionArea sx={{ maxWidth: 250 }}>
      <CardMedia
          component="img"
          height="140"
          image={firstImage ? imageURL + firstImage : "https://via.placeholder.com/150"}
          alt={name}
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {description}
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
     
      
     
        
      </CardActions>
    </Card>
  )
}

export default MenuComponent