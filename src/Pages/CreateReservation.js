import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import RoomComp from "../Components/RoomComp";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import Stack from "@mui/material/Stack";
import axios from 'axios'
import { Grid, Container, Button } from "@material-ui/core";
import { Paper , Box} from '@mui/material'
import RoomDetailsComp from '../Components/RoomDetailsComp'
import moment from 'moment';
// import useAuth
import { useAuth } from "../Auth/AuthProvider";
import { Alert } from '@mui/material';
import { Carousel } from 'react-material-ui-carousel';
const imageURL = "https://res.cloudinary.com/dj9cp8xcv/";

const CreateReservation = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  console.log("LOCATION",location.state);
  const [details] = useState(location?.state);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [alert, setAlert] = useState({
    message: "",
    severity: "success",
    open: false,
  });
  console.log("details", details);
  // console.log("in", checkIn);
  // console.log("out", setCheckOut);
  const start = moment(checkIn).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  const end = moment(checkOut).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  // const daysCount = start.diff(end, 'days')
  // console.log("daysCount", daysCount)
// console.log("end, start", end, start)
// console.log("Current User", currentUser?.user_id)
const API_URL = 'http://localhost:8000/reservations/';
console.log(details,"DETS")
const createReservation = async (e) => {
  e.preventDefault();
  const data = {
    check_in_date: start,
    check_out_date: end,
    customer: currentUser?.user_id,
    room: details?.room?.id
  };
  try {
    const res = await axios.post(API_URL, data);
    console.log(res.data);
    setAlert({
      message: "Reservation created successfully",
      severity: "success",
      open: true
    });
  } catch (e) {
    console.log(e);
    setAlert({
      message: "Failed to create reservation",
      severity: "error",
      open: true
    });
  }
};

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  }
  return (
    <div>
    <Box sx={{ width: "100%" }}>
    {alert?.open && (
  <Alert severity={alert.severity} onClose={handleCloseAlert}>
    {alert.message}
  </Alert>
)}

      <Grid container p={2}>
        <Grid item md={6}>
          {details && (
            <>
             {/* <Carousel animation="slide">
  {details?.room.images.map((image, index) => (
    <img
      key={index}
      component="img"
      height="400"
      image={imageURL + image}
      alt={"alt"}
    />
  ))}
</Carousel> */}
            
            
            
            <RoomDetailsComp
              image={details?.room.images}
              room_number={details?.room.room_number}
              room_type={details?.room.room_type}
              description={details?.room.description}
              max_occupancy={details?.room.max_occupancy}
              price={details?.room.price}
              availability={details?.room.availability}
            /> 
            </>
          )}
          
       
        </Grid>
        <Grid item md={4} p={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <MobileDateTimePicker
                label="Check In"
                value={checkIn}
                onChange={(newValue) => {
                  setCheckIn(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <MobileDateTimePicker
                label="Check Out"
                value={checkOut}
                onChange={(newValue) => {
                  setCheckOut(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <Button variant="contained" color="primary" onClick={createReservation}>
                CREATE RESERVATION
              </Button>
            </Stack>
          </LocalizationProvider>
          
        </Grid>
      </Grid>
    </Box>
  </div>

  );
};

export default CreateReservation;
