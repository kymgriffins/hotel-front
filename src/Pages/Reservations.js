import React, { useState, useEffect } from 'react'
import axios from 'axios'
import baseUrl from '../Constants/Constants'
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Container,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import moment from 'moment';
import { DataGridLayout } from '../Layout/DataGridLayout'
import { DataGrid } from "@mui/x-data-grid";
const Reservation = () => {
  const today = moment();
  const [reservation, setReservation] = useState([]);
  const [checkOutDate, setCheckOutDate]= useState("")
  const [checkInDate, setCheckInDate]= useState("")
  const [daysLeft, setDaysLeft] = useState({});
  const [userId, setUserId] = useState("")
  const[name, setName] = useState("")
  const [rooms,setRooms] = useState([])
  const [users, setUsers] = useState([]);
  console.log("NAMWE",users)
  useEffect(() => {
    axios.get("http://localhost:8000/reservations/").then((response) => {
      setReservation(response.data);
      const daysLeftData = {};
      response.data.forEach((reservation) => {
        const daysLeft = moment(reservation.check_out_date).diff(today, 'days');
        daysLeftData[reservation.id] = daysLeft;
      });
      setDaysLeft(daysLeftData);
      findUsers()
    
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:8000/rooms/").then((response) => {
     setRooms(response.data)
    });
  }, []);
const findUsers = () => {
  const res =axios
  .get(`http://127.0.0.1:8000/auth/register/`)
  .then((response) => {
    const users = response.data.filter((user) => userId.includes(userId));
    setUsers(users);
   
  })
  .catch((error) => {
    console.log(error);
  });
}
  console.log("Reservation", reservation)

  const columns = [

    { field: "id", headerName: "id", description: "", flex: 0.1 },
    {
      field: "customer", headerName: "Customer Name", description: "Customer Name", flex: 0.2,
      renderCell: (params) => {
        const user = users.find((u) => u.id === params.value);
        setUserId(params.value)
        return (
          <>
            <Typography variant="body2" component="body2">
              {user ? user.username : "Unknown"}
            </Typography>
          </>
        )
      }

    },
    {
      field: "check_in_date", headerName: "Check In", description: "", flex: 0.2,
      renderCell: (params) => {
        console.log("checkout", params)
        setCheckInDate(params.value)
        return (
          <>
            <Typography variant="body2" component="body2">
              {moment(params.value).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>

          </>
        )
      }
    },
    {
      field: "check_out_date", headerName: "Check Out", description: "", flex: 0.2,
      renderCell: (params) => {
        console.log("checkout", params)
        
        return (
          <>
            <Typography variant="body2" component="body2">
              {moment(params.value).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>

          </>
        )
      }

    },

    {
      field: "room",
      headerName: 'Room ',
      description: "Room Booked",
      flex: 0.1,
      renderCell: (params) => {
        console.log(params)
        const room = rooms.find((room) => room.id === params.row.room);
        return (
          <>
            <Typography variant="body2" component="body2">
              {room ? room.room_number : 'N/A'}
            </Typography>
          </>
        );
      },
    },
    
    // {
    //   field: "room",
    //   headerName: 'Tyoe',
    //   description: "Room Type Booked",
    //   flex: 0.1,
    //   renderCell: (params) => {
    //     // console.log("params",params)
    //     return (
    //       <>
    //         <Typography variant="body2" component="body2">
    //           {params.value.room_type}
    //         </Typography>

    //       </>
    //     )
    //   },
    // },
    // {
    //   field: "No of Days",
    //   headerName: "Days",
    //   flex: 0.1,
    //   renderCell: (params) => {
    //     const diffInDays = moment(params.row.check_out_date).diff(moment(params.row.check_in_date), 'days');
    //     return (
    //       <Typography variant="body2" component="body2">
    //         {diffInDays}
    //       </Typography>
    //     );
    //   },
    // },
    {
      field: "Days Left",
      headerName: "Days Left",
      flex: 0.1,
      renderCell: (params) => {
        const today = moment();
        const daysRemaining = moment(params.row.check_out_date).diff(today, 'days');
        return (
          <Typography variant="body2" component="body2">
            {daysRemaining}
          </Typography>
        );
      },
    },
    

  ]

  return (
    <div>
      <Container maxWidth="xl">
        <DataGridLayout>
          <DataGrid
            rowHeight={50}
            rows={reservation}
            //  if tabValue is 0 show all data

            columns={columns}
            getRowId={(row) => row.id}
            pageSize={20}
          />
        </DataGridLayout>
      </Container>
    </div>
  )
}

export default Reservation