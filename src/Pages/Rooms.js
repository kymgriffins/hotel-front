import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import baseUrl from "../Constants/Constants";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Container,
  Typography,
  Stack,
  Grid,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import { DataGridLayout } from "../Layout/DataGridLayout";
import { DataGrid } from "@mui/x-data-grid";
import RoomComp from "../Components/RoomComp";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../Auth/AuthProvider';

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState("");
  const [open, setOpen] = useState(false);
  const [poperOpen, setPopperOpen] = React.useState(false);
  const [description,setDescription] = useState('')
  const [roomNo, setRoomNo] = useState('')
  const [price, setPrice]= useState('')
  const [occupancy, setOccupancy] = useState('')
  const [availability, setAvailability] = useState('')
  const [type, setType] = useState('')
  const [images, setImages] = useState([]);
  const [role, setRole] = useState("");
  const { currentUser } = useAuth();


  const handleClickOpen = () => {
    setPopperOpen(true);
  };

  const handleClose = () => {
    setPopperOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/rooms/").then((response) => {
      setRooms(response.data);
      setOpen(true);
    });
  }, []);
  console.log("rooms", rooms);

  const handleShowBooking = useCallback(
    (room) => () => {
      navigate("/rooms/create/reservation", { state: { room: room } });

      console.log("row", room);
    },
    []
  );
  const createRoom= async (e)=>{
    e.preventDefault()
    const data = { room_number:roomNo, price:price, description:description, availability:availability,max_occupancy:occupancy, room_type:type, images:images}
    try {
      const res = await axios.post('http://127.0.0.1:8000/rooms/', data).then(handleClose())
      console.log(res.data)
    } catch (e) {
      alert(e)
    }

  }
  const handleImageUpload = (event) => {
    console.log(event); // check what the event object looks like
    const fileList = event.target.files;
    const fileArray = Array.from(fileList);
    setImages(fileArray);
  };
  console.log("IMG",images)
  const userId = currentUser?.user_id;
  axios.get(`http://127.0.0.1:8000/auth/register/`)
    .then(response => {
      const user = response.data.find(u => u.id === userId); // Filter user with matching user_id
      // console.log(user); // user object
      // console.log(user.roles);
      setRole(user.roles);
    })
    .catch(error => {
      // console.log(error);
    });
  
  
  
  
  
  
  return (
    <div>
      <Container maxWidth="xl">
        {!open && (
          <>
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          </>
        )}
        {open && (
          <>
          
          <>
          <Grid container spacing={2}>
        <div>
          {

          }
      {role.includes('employee') && (
  <Button variant="outlined" onClick={handleClickOpen}>
    Add Room 
  </Button>
)}
      <Dialog open={poperOpen} onClose={handleClose}>
      <form encType="multipart/form-data" onSubmit={createRoom}>
        <DialogTitle>Add Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details to add to the menu.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="number"
            label="Room Number"
            type="text"
            value={roomNo}
            fullWidth
            variant="outlined"
            onChange={(e) => { setRoomNo(e.target.value) }}
          />
           <TextField
            autoFocus
            margin="dense"
            id="type"
            label="Room Type"
            type="text"
            value={type}
            onChange={(e) => { setType(e.target.value) }}

            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            value={price}
            onChange={(e) => { setPrice(e.target.value) }}

            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            value={description}
            onChange={(e) => { setDescription(e.target.value) }}

            fullWidth
            variant="outlined"
          />
           <TextField
            autoFocus
            margin="dense"
            id="occupancy"
            label="Maximum Occupancy"
            type="text"
            value={occupancy}
            onChange={(e) => { setOccupancy(e.target.value) }}

            fullWidth
            variant="outlined"
          />
           <TextField
            autoFocus
            margin="dense"
            id="availability"
            label="Availability"
            type="text"
            value={availability}
            onChange={(e) => { setAvailability(e.target.value) }}

            fullWidth
            variant="outlined"
          />
           <TextField
          autoFocus
          margin="dense"
          id="images"
          label="Images"
          type="file"
          multiple
          onChange={handleImageUpload}
          fullWidth
          variant="outlined"
        />


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createRoom}>Add</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>

        </Grid>
          </>
            <Grid container spacing={2}>
              {rooms.map((room, index) => (
                <Grid container p={2} md={3}>
                  <div onClick={handleShowBooking(room)}>
                    <RoomComp
                    image={room.images}
                      room_number={room.room_number}
                      room_type={room.room_type}
                      description={room.description}
                      max_occupancy={room.max_occupancy}
                      price={room.price}
                      availability={room.availability}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
};

export default Rooms;
