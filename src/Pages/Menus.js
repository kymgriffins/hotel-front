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
import { useAuth } from '../Auth/AuthProvider';
const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] =useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [poperOpen, setPopperOpen] = React.useState(false);
  const [basketNumbers, setBasketNumbers] = useState(0);
  const [images, setImages] = useState(null);
  const [role, setRole] = useState("");
  const { currentUser } = useAuth();
  console.log("basket",images);

  const addToBasket = () => {
    setBasketNumbers(oldBasketNum => oldBasketNum + 1); //this is the correct way to update the state on click, bcs u wrote setBasketNumbers +1 which won't work
  };


  const handleClickOpen = () => {
    setPopperOpen(true);
  };

  const handleClose = () => {
    setPopperOpen(false);
  };
  const createMenu = async (e) => {
    e.preventDefault();
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('description', description);
  const imageBlob = new Blob([images.image], {type: 'image/jpeg'});
  formData.append('images', imageBlob, images.image.name);

  try {
    const res = await axios.post("http://localhost:8000/menu/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
  };
  useEffect(() => {
    axios.get("http://localhost:8000/menu/").then((response) => {
      setMenus(response.data);
      setOpen(true);
    });
  }, []);
  console.log("menus", menus);


  const handleImageChange = (e) => {
    setImages({
      ...images,
      image: e.target.files[0]
    })
  };
  const userId = currentUser?.user_id;
  axios.get(`http://127.0.0.1:8000/auth/register/`)
    .then(response => {
      const user = response.data.find(u => u.id === userId); // Filter user with matching user_id
      console.log(user); // user object
      console.log(user.roles);
      setRole(user.roles);
    })
    .catch(error => {
      console.log(error);
    });
  
  console.log("IMG",images)
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
        {role.includes('employee') && (
  <Button variant="outlined" onClick={handleClickOpen}>
    Add Menu
  </Button>
)}
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
            <TextField
          autoFocus
          margin="dense"
          id="images"
          label="Images"
          type="file"
          multiple
          onChange={handleImageChange}
          fullWidth
          accept="image/png, image/jpeg" 
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
