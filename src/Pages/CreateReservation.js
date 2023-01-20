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

const CreateReservation = () => {
  const location = useLocation();
  console.log(location.state);
  const [details] = useState(location.state);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState(null);
  console.log("details", details);
  console.log("in", checkIn);
  console.log("out", setCheckOut);
  const start = moment(checkIn).format('L')
  const end = moment(checkOut).format('L')
  // const daysCount = start.diff(end, 'days')
  // console.log("daysCount", daysCount)
console.log("end, start", end, start)
  const createReservation= async (e)=>{
    e.preventDefault()
    const data = { check_in_date: checkIn, check_out_date: checkOut, customer: 1 , room:1}
    try {
      const res = await axios.post('http://127.0.0.1:8000/reservations/', data)
      console.log(res.data)
    } catch (e) {
      alert(e)
    }

  }
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid container p={2}>
          <Grid item md={6}>
         
            <RoomDetailsComp
              room_number={details.room.room_number}
              room_type={details.room.room_type}
              description={details.room.description}
              max_occupancy={details.room.max_occupancy}
              price={details.room.price}
              availability={details.room.availability}
            />
         
            
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
