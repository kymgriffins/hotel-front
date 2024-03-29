import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// import { withStyles } from '@mui/material-ui/styles';
import Home from './Pages/Home'
import Menus from './Pages/Menus'
import Orders from './Pages/Orders'
import Reservation from './Pages/Reservations';
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Layout } from './Layout/Layout';
import {DashboardNavbar} from './Layout/DashboardNavbar';
import {Routes, Route} from 'react-router-dom'
import AppLayout from './Components/AppLayout';
import Rooms from './Pages/Rooms';
import OrderDetails from './Pages/OrderDetails';
import CreateReservation from './Pages/CreateReservation';
import AuthenticatedRoute from "./Auth/AuthenticatedRoute";

// const theme = withStyles({
//   typography: {
//     fontFamily: [
//       'Poppins',
      
//     ].join(','),
//   }
// });
function App() {

  return (
    // <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route exact path="/" element={<AuthenticatedRoute />}>
      <Route path='/' element={<AppLayout />}>
      <Route path='/menus' element={ <Menus/>}/>
      <Route path="/orders/" element={<Orders />} />
      <Route path='/reservations' element={ <Reservation/>}/>
      <Route path='/rooms' element={ <Rooms/>}/>
      <Route path='/' element={ <Home/>}/>
      <Route path='/orders/detail' element={ <OrderDetails/>}/>
      <Route path='/rooms/create/reservation' element={<CreateReservation/>}/>
      </Route>
      </Route>
    
    </Routes>
    // </ThemeProvider>
  );
}

export default App;
