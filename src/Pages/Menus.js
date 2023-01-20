import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../Constants/Constants";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Container,
  Typography,
  Divider,
  Paper,
  Stack,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuComponent from "../Components/MenuComp";
const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] =useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [poperOpen, setPopperOpen] = React.useState(false);
  const [basketNumbers, setBasketNumbers] = useState(0);
  console.log("basket",basketNumbers);

  const addToBasket = () => {
    setBasketNumbers(oldBasketNum => oldBasketNum + 1); //this is the correct way to update the state on click, bcs u wrote setBasketNumbers +1 which won't work
  };


  const handleClickOpen = () => {
    setPopperOpen(true);
  };

  const handleClose = () => {
    setPopperOpen(false);
  };
  const createMenu= async (e)=>{
    e.preventDefault()
    const data = { name:name, price:price, description:description}
    try {
      const res = await axios.post('http://127.0.0.1:8000/menu/', data).then(handleClose())
      console.log(res.data)
    } catch (e) {
      alert(e)
    }

  }
  useEffect(() => {
    axios.get("http://localhost:8000/menu/").then((response) => {
      setMenus(response.data);
      setOpen(true);
    });
  }, []);
  console.log("menus", menus);
  const handleAddToCart = async (e)=>{
    e.preventDefault();
    
     
  }
  return (
    <Container maxWidth="xl">
      
      {!open && (
        <>
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        </>
      )}
      {open && (
        <>
        <Grid container spacing={2}>
        <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Food
      </Button>
      <Dialog open={poperOpen} onClose={handleClose}>
        <DialogTitle>Add Menu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details to add to the menu.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={name}
            fullWidth
            variant="outlined"
            onChange={(e) => { setName(e.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            type="number"
            value={price}
            onChange={(e) => { setPrice(e.target.value) }}

            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            value={description}
            onChange={(e) => { setDescription(e.target.value) }}

            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createMenu}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>

        </Grid>
          <Grid container spacing={2}>
            {menus.map((menu) => (
              <Grid container p={2} md={3}>
                {/* <div onClick={handleAddToCart(menu)}> */}
                <MenuComponent
                  price={menu.price}
                  name={menu.name}
                  description={menu.description}
                  
                />
                <Button size="small" color="primary" onClick={addToBasket}>
          Add
        </Button>
                {/* </div> */}
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Menus;
