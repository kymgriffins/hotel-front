import React, {useState, useEffect} from 'react'
import axios from 'axios'
import baseUrl from '../Constants/Constants'
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Container,
  Typography,

} from "@mui/material";
import {DataGridLayout} from '../Layout/DataGridLayout'
import { DataGrid } from "@mui/x-data-grid";
const Rooms = () => {
    const [rooms, setRooms] = useState('')
    useEffect(() => {
        axios.get("http://localhost:8000/rooms").then((response) => {
          setRooms(response.data);
        });
      }, []);
      console.log("rooms", rooms)
      const columns = [
        
        { field: "id", headerName: "id", description: "", flex: 0.1 },
        { field: "room_number", headerName: "Number", description: "", flex: 0.1 },
        { field: "price", headerName: "Price", description: "", flex: 0.1 },
        { field: "max_occupancy", headerName: "Max Occupancy", description: "", flex: 0.1 },
        { field: "room_type", headerName: "Type", description: "", flex: 0.1 },
        
      ]
  return (
    <div>
        <Container maxWidth="xl">
        <DataGridLayout>
         <DataGrid
                    rowHeight={50}
                    rows={rooms}
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

export default Rooms