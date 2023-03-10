import React, {useState, useEffect} from 'react'
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
import {DataGridLayout} from '../Layout/DataGridLayout'
import { DataGrid } from "@mui/x-data-grid";
const Reservation = () => {
    const [reservation, setReservation] = useState('')
    useEffect(() => {
        axios.get("http://localhost:8000/reservations").then((response) => {
          setReservation(response.data);
        });
      }, []);
      console.log("Reservation", reservation)
      const columns = [
        
        { field: "id", headerName: "id", description: "", flex: 0.1 },
        { field: "customer", headerName: "Customer", description: "Customer Name", flex: 0.2, 
        renderCell: (params)=>{
    console.log("params")
    return(
      <>
      <Typography variant="body2" component="body2">
      {params.value.username}
</Typography>
        
      </>
    )
  }

},
        { field: "check_in_date", headerName: "Check In", description: "", flex: 0.2,
        renderCell: (params)=>{
          console.log("checkout",params)
          return(
            <>
           <Typography variant="body2" component="body2">
           {moment(params.value).format('MMMM Do YYYY, h:mm:ss a')}
</Typography>
              
            </>
          )
        } },
        { field: "check_out_date", headerName: "Check Out", description: "", flex: 0.2,
        renderCell: (params)=>{
          console.log("checkout",params)
          return(
            <>
           <Typography variant="body2" component="body2">
           {moment(params.value).format('MMMM Do YYYY, h:mm:ss a')}
</Typography>
              
            </>
          )
        }
      
      },
        
             {
            field:"room",
            headerName:'Room',
            description:"Room Booked",
            flex:0.1,
            renderCell: (params)=>{
              // console.log("params",params)
              return(
                <>
               <Typography variant="body2" component="body2">
                {params.value.room_number}
</Typography>
                  
                </>
              )
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