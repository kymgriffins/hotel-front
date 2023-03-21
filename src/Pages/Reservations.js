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
  const [reservation, setReservation] = useState('')
  const [checkOutDate, setCheckOutDate]= useState("")
  const [checkInDate, setCheckInDate]= useState("")
  useEffect(() => {
    axios.get("http://localhost:8000/reservations/").then((response) => {
      // for all that have 0 days difference , don't display 
      const reservations  = response.data.filter((reservation) => {
        let checkOutDate = moment(reservation.checkOutDate);
        let checkInDate = moment(reservation.checkInDate);
        let diff = checkInDate.diff(checkOutDate, 'days');
        if (diff === 0) {
          return false;
          }
          return true;
          
      })
      setReservation(reservations);
    });
  }, []);
  console.log("Reservation", reservation)
  const daysRemaining = moment(checkOutDate).diff(today, 'days');
  const columns = [

    { field: "id", headerName: "id", description: "", flex: 0.1 },
    {
      field: "customer", headerName: "Customer Name", description: "Customer Name", flex: 0.2,
      renderCell: (params) => {
        setCheckOutDate(params.value)
        console.log("params")
        return (
          <>
            <Typography variant="body2" component="body2">
              {params.value.username}
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
      headerName: 'Room',
      description: "Room Booked",
      flex: 0.1,
      renderCell: (params) => {
        // console.log("params",params)
        return (
          <>
            <Typography variant="body2" component="body2">
              {params.value.room_number}
            </Typography>

          </>
        )
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
    {
      field: "No of Days",
      headerName: "Days",
      description: "",
      flex: 0.1,
      renderCell: (params) => {
        return (
          <Typography variant="body2" component="body2">
              {diffInDays}
             </Typography>
          // <Tooltip title="View more">
          //   <IconButton
          //     color="primary"
          //     aria-label="view more"
          //     onClick={handleShowOrder(params.row.id, params.row)}
          //   >
          //     <Visibility />
          //   </IconButton>
          // </Tooltip>
        );
      },
    },
    {
      field: "Days Remaining",
      headerName: "Days Left",
      description: "",
      flex: 0.1,
      renderCell: (params) => {
        return (
          <Typography variant="body2" component="body2">
              {daysRemaining}
             </Typography>
          // <Tooltip title="View more">
          //   <IconButton
          //     color="primary"
          //     aria-label="view more"
          //     onClick={handleShowOrder(params.row.id, params.row)}
          //   >
          //     <Visibility />
          //   </IconButton>
          // </Tooltip>
        );
      },
    },

  ]
  const diffInDays = moment(checkOutDate).diff(moment(checkInDate), 'days');
  console.log("diffInDays",diffInDays)
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