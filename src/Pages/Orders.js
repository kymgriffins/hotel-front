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
import moment from 'moment';
const Orders = () => {
  const navigate = useNavigate();
    const [orders, setOrders] = useState('')
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("")
    const handleShowOrder = useCallback(
      (id, row) => () => {
        navigate("/orders/detail", { state: { id: id, row: row } });
        console.log("id", id);
        console.log("row", row);
      },
      []
    );
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
    useEffect(() => {
        axios.get("http://localhost:8000/orders").then((response) => {
          setOrders(response.data);
          findUsers()
        });
      }, []);
      console.log("Orders", orders)
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
        // { field: "quantity", headerName: "Quantity", description: "", flex: 0.1 },
        // { field: "ordered_time", headerName: "Time Ordered", description: "", flex: 0.1 },
        // { field: "quantity", headerName: "Quantity", description: "", flex: 0.1 },
        {
          field: "ordered_time", headerName: "Time Ordered", description: "", flex: 0.2,
          renderCell: (params) => {
           
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