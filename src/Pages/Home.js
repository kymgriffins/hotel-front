// import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Grid, Paper, Typography } from '@material-ui/core';
// import axios from 'axios'
// const Home = () => {
//   const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//       margin: theme.spacing(2),
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//   }));
//   const classes = useStyles();
//   const [roomCount, setRoomCount] = useState(0);
//   const [reservationCount, setReservationCount] = useState(0);

//   useEffect(() => {
//     axios
//     .get('http://localhost:8000/dashboard/')
//     .then((response) => {
//     setRoomCount(response.data.num_available_rooms);
//     setReservationCount(response.data.num_reserved_rooms);
//     })
//     .catch((error) => {
//     console.log(error);
//     });
//     }, []);
//   return (
//     <div className={classes.root}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Paper className={classes.paper}>
//             <Typography variant="h5" component="h2">
//               Rooms Available
//             </Typography>
//             <Typography variant="h3" component="h2">
//               {roomCount}
//             </Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <Paper className={classes.paper}>
//             <Typography variant="h5" component="h2">
//               Reservations Made
//             </Typography>
//             <Typography variant="h3" component="h2">
//               {reservationCount}
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default Home
import React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', reservations: 10, orders: 20, revenue: 1000 },
  { name: 'Feb', reservations: 20, orders: 30, revenue: 2000 },
  { name: 'Mar', reservations: 30, orders: 40, revenue: 3000 },
  { name: 'Apr', reservations: 40, orders: 50, revenue: 4000 },
  { name: 'May', reservations: 50, orders: 60, revenue: 5000 },
  { name: 'Jun', reservations: 60, orders: 70, revenue: 6000 },
  { name: 'Jul', reservations: 70, orders: 80, revenue: 7000 },
];

const Home = () => {
  return (
    <div>
      <Typography variant="h4">Home</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <Typography variant="h6">Reservations</Typography>
            <LineChart width={400} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="reservations" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <Typography variant="h6">Orders</Typography>
            <LineChart width={400} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <Typography variant="h6">Revenue</Typography>
            <LineChart width={400} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#ffc658" activeDot={{ r: 8 }} />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
