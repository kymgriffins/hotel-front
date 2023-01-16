import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,CardActions , Button } from '@mui/material';
const MenuComponent = ({name, price, image, description}) => {
  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardActionArea sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="140"
          
          image="https://img.freepik.com/free-photo/flat-lay-batch-cooking-composition_23-2148765597.jpg?w=2000"
          alt={name}
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {description}
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
     
      
     
        <Button size="small" color="primary">
          Add
        </Button>
      </CardActions>
    </Card>
  )
}

export default MenuComponent