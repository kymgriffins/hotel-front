import React from "react";
import { Paper, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button } from "@mui/material";

const RoomComp = ({
  room_number,
  price,
  description,
  max_occupancy,
  availability,
  room_type,
  image,
}) => {
  const imageURL = "https://res.cloudinary.com/dj9cp8xcv/";
  const firstImage = image.length > 0 ? image[0].image : null;

  return (
    <Box sx={{ margin: "16px" }}>
      <Paper elevation={3} sx={{ backgroundColor: "#f0f0f0" }}>
        <Card sx={{ maxWidth: 400 }}>
          <CardActionArea sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="200"
              width="70"
              image={
                firstImage
                  ? imageURL + firstImage
                  : "https://via.placeholder.com/150"
              }
              alt={room_number}
            />
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: "black" }}>
                Room {room_number}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom sx={{ color: "black" }}>
                Type: {room_type}
              </Typography>
              <Typography variant="h6" color="text.primary" gutterBottom sx={{ color: "black" }}>
                Ksh {price}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ color: "grey" }}>
                {description.slice(0, 50)}...
              </Typography>
              <Typography variant="body1" color="text.primary" gutterBottom sx={{ color: "black" }}>
                Max Occupancy: {max_occupancy}
              </Typography>
              <Typography variant="body1" color="text.primary" gutterBottom sx={{ color: "black" }}>
                Availability: {availability}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Book
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </Box>
  );
};

export default RoomComp;
