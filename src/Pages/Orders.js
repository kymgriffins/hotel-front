import React, {useState, useEffect, useCallback} from 'react'
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
import { Visibility } from "@mui/icons-material";
import {DataGridLayout} from '../Layout/DataGridLayout'
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const navigate = useNavigate();
    const [orders, setOrders] = useState('')
    const handleShowOrder = useCallback(
      (id, row) => () => {
        navigate("/orders/detail", { state: { id: id, row: row } });
        console.log("id", id);
        console.log("row", row);
      },
      []
    );
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
        {
          field: "View Details",
          headerName: "View Details",
          description: "",
          flex: 0.1,
          renderCell: (params) => {
            return (
              <Tooltip title="View more">
                <IconButton
                  color="primary"
                  aria-label="view more"
                  onClick={handleShowOrder(params.row.id, params.row)}
                >
                  <Visibility />
                </IconButton>
              </Tooltip>
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