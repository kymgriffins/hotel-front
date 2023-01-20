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


  const handleClickOpen = () => {
    setPopperOpen(true);
  };

  const handleClose = () => {
    setPopperOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/rooms").then((response) => {
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
    const data = { room_number:roomNo, price:price, description:description, availability:availability,max_occupancy:occupancy, room_type:type}
    try {
      const res = await axios.post('http://127.0.0.1:8000/rooms/', data).then(handleClose())
      console.log(res.data)
    } catch (e) {
      alert(e)
    }

  }

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
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Room 
      </Button>
      <Dialog open={poperOpen} onClose={handleClose}>
        <DialogTitle>Add Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details to add to the menu.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
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
            id="name"
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
            id="name"
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
            id="name"
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
            id="name"
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
            id="name"
            label="Availability"
            type="text"
            value={availability}
            onChange={(e) => { setAvailability(e.target.value) }}

            fullWidth
            variant="outlined"
          />


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createRoom}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>

        </Grid>
          </>
            <Grid container spacing={2}>
              {rooms.map((room, index) => (
                <Grid container p={2} md={3}>
                  <div onClick={handleShowBooking(room)}>
                    <RoomComp
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
