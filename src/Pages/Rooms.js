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
  Snackbar, 
  InputLabel
} from "@mui/material";
import { DataGridLayout } from "../Layout/DataGridLayout";
import { DataGrid } from "@mui/x-data-grid";
import RoomComp from "../Components/RoomComp";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../Auth/AuthProvider";
import CloseIcon from "@mui/icons-material/Close";
// import { useHistory } from 'react-router-dom';

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState("");
  const [open, setOpen] = useState(false);
  const [poperOpen, setPopperOpen] = React.useState(false);
  const [description, setDescription] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [price, setPrice] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [availability, setAvailability] = useState("available");
  const [type, setType] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");



  const [role, setRole] = useState("");
  const { currentUser } = useAuth();
  // const history = useHistory();
  const [selectedFile, setSelectedFile] = useState("");
// console.log(selectedFile,"SELECTED")
 
  console.log(selectedFile, "SELECTED");
  const handleFileInputChange = (event) => {
    setSelectedFile([...selectedFile, ...event.target.files]);
  };
  // const searchRooms = (term) => {
  //   const filteredRooms = rooms.filter(
  //     (room) =>
  //       room.room_number.toLowerCase().includes(term.toLowerCase()) ||
  //       room.description.toLowerCase().includes(term.toLowerCase()) || room.room_type.toLowerCase().includes(term.toLowerCase())
  //   );
  //   setRooms(filteredRooms);
  // };
  // console.log("ROOM", rooms);
  

  const handleClickOpen = () => {
    setPopperOpen(true);
  };

  const handleClose = () => {
    setPopperOpen(false);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };
  // useEffect(() => {
  //   if (searchTerm) {
  //     searchRooms(searchTerm);
  //   } else {
  //     axios.get(`${baseUrl}rooms/`).then((response) => {
  //       setRooms(response.data);
  //       setOpen(true);
  //     });
  //   }
  // }, [searchTerm]);
  
  useEffect(() => {
    axios.get("http://localhost:8000/rooms/").then((response) => {
      setRooms(response.data);
      setOpen(true);
    });
  }, [rooms]);
  console.log("rooms", rooms);

  const handleShowBooking = useCallback(
    (room) => () => {
      navigate("/rooms/create/reservation", { state: { room: room } });

      console.log("row", room);
    },
    []
  );

  const createRoom = async (e) => {
    e.preventDefault();
  
    const data = {
      price: price,
      description: description,
      room_number: roomNo,
      room_type: type,
      max_occupancy: occupancy,
      availability: availability,
    };
  
    try {
      const roomRes = await axios.post(`${baseUrl}rooms/`, data);
      const roomId = roomRes.data.id;
      const imageFormDataList = [];
      selectedFile.forEach((image) => {
        const imageFormData = new FormData();
        imageFormData.append("room", roomId);
        imageFormData.append("image", image);
        imageFormDataList.push(imageFormData);
      });
      const uploadImageResponses = await Promise.all(
        imageFormDataList.map((formData) =>
          axios.post(`${baseUrl}roomimages/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        )
      );
  
      // Display success Snackbar
      setSnackbarSeverity("success");
      setSnackBarMessage("Room created with images");
      setSnackBarOpen(true);
    } catch (err) {
      console.log(err);
  
      // Display error Snackbar
      setSnackbarSeverity("error");
      setSnackBarMessage("Failed to create room");
      setSnackBarOpen(true);
    }
  };
  

  
  console.log("ROOMS", rooms);
  const userId = currentUser?.user_id;
  axios
    .get(`http://127.0.0.1:8000/auth/register/`)
    .then((response) => {
      const user = response.data.find((u) => u.id === userId); // Filter user with matching user_id
      // console.log(user); // user object
      // console.log(user.roles);
      setRole(user.roles);
    })
    .catch((error) => {
      // console.log(error);
    });

  return (
    <div>
      <Container maxWidth="xl">
      <Snackbar
            open={snackBarOpen}
            autoHideDuration={6000}
            onClose={handleSnackBarClose}
            message={snackBarMessage}
            severity={snackbarSeverity}
            ContentProps={{
              sx: {
                backgroundColor:
                  snackbarSeverity === "success"
                    ? "#4caf50"
                    : snackbarSeverity === "error"
                    ? "#f44336"
                    : snackbarSeverity === "warning"
                    ? "#ff9800"
                    : "#2196f3",
                color: "#ffffff",
              },
            }}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackBarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />

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
                  {}
                  {role.includes("employee") && (
                    <Button variant="outlined" onClick={handleClickOpen}>
                      Add Room
                    </Button>
                  )}
                  <Dialog open={poperOpen} onClose={handleClose}>
                   
                      <DialogTitle>Add Room</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Fill in the details to add to the room.
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
                          onChange={(e) => {
                            setRoomNo(e.target.value);
                          }}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="type"
                          label="Room Type"
                          type="text"
                          value={type}
                          onChange={(e) => {
                            setType(e.target.value);
                          }}
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
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
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
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
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
                          onChange={(e) => {
                            setOccupancy(e.target.value);
                          }}
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
                          onChange={(e) => {
                            setAvailability(e.target.value);
                          }}
                          fullWidth
                          variant="outlined"
                        />
                        {/* <TextField
          autoFocus
          margin="dense"
          id="images"
          label="Images"
          type="file"
          multiple
          onChange={handleImageUpload}
          fullWidth
          variant="outlined"
        /> */}
                       <Grid item xs={12} md={6}>
                        <InputLabel id="team-select-label">
                            Upload room images
                          </InputLabel>
                          <input
                            type="file"
                            multiple
                            onChange={handleFileInputChange}
                          />
                        </Grid>
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
            {/* <TextField
  label="Search rooms"
  variant="outlined"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  sx={{ mb: 2 }}
/> */}

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
