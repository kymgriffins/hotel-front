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
import {DataGridLayout} from '../Layout/DataGridLayout'
import { DataGrid } from "@mui/x-data-grid";
const Orders = () => {
    const [orders, setOrders] = useState('')
    useEffect(() => {
        axios.get("http://localhost:8000/orders").then((response) => {
          setOrders(response.data);
        });
      }, []);
      console.log("Orders", orders)
      const columns = [
        
        { field: "id", headerName: "id", description: "", flex: 0.1 },
        { field: "quantity", headerName: "Quantity", description: "", flex: 0.1 },
        { field: "ordered_time", headerName: "Time Ordered", description: "", flex: 0.1 },
        // { field: "quantity", headerName: "Quantity", description: "", flex: 0.1 },
      ]
  return (
    <div>
      <Container maxWidth="xl">
        <DataGridLayout>
         <DataGrid
                    rowHeight={50}
                    rows={orders}
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

export default Orders