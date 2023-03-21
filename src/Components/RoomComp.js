import React from 'react'
import { Paper , Box} from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,CardActions , Button } from '@mui/material';
const RoomComp = ({room_number,price,description, max_occupancy, availability,room_type, image}) => {
  return (
    <Box >
      
      <Paper elevation={3} >
      <Card sx={{ maxWidth: 345 }} >
      <CardActionArea sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="140"
          
          image={image}
          alt={"alt"}
        />
        <CardContent >
          <Typography gutterBottom variant="body2" component="div">
            Number:{room_number}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Type:{room_type}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Ksh {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {description}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Max Occupancy:{max_occupancy}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
           Availability: {availability}
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
     
      
     
        {/* <Button size="small" color="primary">
          Book
        </Button> */}
      </CardActions>
    </Card>
    </Paper>
    </Box>
  )
}

export default RoomComp