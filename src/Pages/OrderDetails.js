import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Typography,
  Paper,
  Button,
  Badge,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from "@material-ui/core";

const OrderDetails = () => {
  const [menus, setMenus] = useState([]);
  const location = useLocation();
  const order = location.state.row;
  const [status, setStatus] = useState(order.status);

 
  useEffect(() => {
    axios.get("http://localhost:8000/menu/").then((response) => {
      setMenus(response.data);
    });
  }, []);

  const updateStatus = () => {
    axios
      .patch(`http://localhost:8000/orders/${order.id}/`, {
        ...order,
        status: !status,
      })
      .then(() => {
        setStatus(!status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Order Details
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
        {order.items.map((item) => {
  const menuItem = menus.find((menu) => menu.id === item.food);
  
  return (
    <ListItem sx={{ backgroundColor: "grey.200", borderRadius: 2 }} key={item.id}>
      <ListItemText
        sx={{
          "& .MuiListItemText-primary": {
            fontWeight: "bold",
            fontSize: "1.2rem",
          },
          "& .MuiListItemText-secondary": {
            color: "grey.600",
          },
        }}
        primary={`${item.quantity} x ${
          menuItem ? menuItem.name : "Unknown Item"
        }`}
        secondary={`Item ID: ${item.id}`}
      />
    </ListItem>
  );
})}


        </List>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Order Details Summary
        </Typography>
        <Typography variant="subtitle1">
          Customer ID: {order.customer}
        </Typography>
        <Typography variant="subtitle1">
          Ordered Time: {order.ordered_time}
        </Typography>
        <Typography variant="subtitle1">
          Status:{" "}
          <Badge color={status ? "success" : "warning"} variant="dot">
            {status ? "Completed" : "Pending"}
          </Badge>
          <Button
            variant="contained"
            color={status ? "success" : "warning"}
            onClick={updateStatus}
            style={{ marginLeft: "10px" }}
          >
            {/* {status ? "Mark as Pending" : "Mark as Completed"} */}
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
