import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../Constants/Constants";
import {
  Box,
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
  InputAdornment,
  SvgIcon,
  Badge,
  InputLabel,
  List, ListItem, ListItemText
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuComponent from "../Components/MenuComp";
import { useAuth } from "../Auth/AuthProvider";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartProvider, useCart } from "react-use-cart";
import { RemoveCircle, AddCircle, Delete } from '@mui/icons-material';
const Menus = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [menus, setMenus] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [poperOpen, setPopperOpen] = React.useState(false);
  const [basketNumbers, setBasketNumbers] = useState(0);
  const [selectedFile, setSelectedFile] = useState("");
  const [images, setImages] = useState(null);
  const [role, setRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const { currentUser } = useAuth();
  const { isEmpty,emptyCart,
    totalUniqueItems,
    items,
    addItem,
    updateItemQuantity,
    removeItem,inCart } = useCart();
  console.log("basket", images);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClickOpen = () => {
    setPopperOpen(true);
  };

  const handleClose = () => {
    setPopperOpen(false);
  };
  const createOrder = async () => {
    try {
      const orderData = {
        customer: currentUser.user_id,
        status: false,
      };
      const orderRes = await axios.post(`${baseUrl}orders/`, orderData);
      const orderId = orderRes.data.id;

      const orderItemsData = items.map((item) => ({
        food: item.id,
        quantity: item.quantity,
        order: orderId,
      }));

      const orderItemsPromises = orderItemsData.map((itemData) =>
        axios.post(`${baseUrl}orderitems/`, itemData)
      );

      const orderItemsRes = await Promise.all(orderItemsPromises);
      emptyCart()
      console.log(orderItemsRes.map((res) => res.data));
    } catch (err) {
      console.log(err);
    }
  };


  const handleOpenCart = () => {
    setCartOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };
  console.log("orderItems", orderItems);
  const createMenu = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    const data = {
      name: name,
      price: price,
      description: description,
    }

    try {
      const menuRes = await axios.post(`${baseUrl}menu/`, data);
      const menuId = menuRes.data.id;
      const imageFormDataList = [];
      selectedFile.forEach((image) => {
        const imageFormData = new FormData();
        imageFormData.append("menu", menuId);
        imageFormData.append("image", image);
        imageFormDataList.push(imageFormData);
      });
      const uploadImageResponses = await Promise.all(
        imageFormDataList.map((formData) =>
          axios.post(`${baseUrl}menuimages/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        )
      );
      

      console.log("Menu created with images:", uploadImageResponses);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    axios.get("http://localhost:8000/menu/").then((response) => {
      setMenus(response.data);
      setOpen(true);
    });
  }, [menus]);
  console.log("menus", menus);

  console.log(selectedFile, "SELECTED");
  const handleFileInputChange = (event) => {
    setSelectedFile([...selectedFile, ...event.target.files]);
  };


  useEffect(() => {
    if (searchQuery) {
      const filtered = menus.filter((menu) =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMenus(filtered);
    } else {
      setFilteredMenus(menus);
    }
  }, [searchQuery, menus]);

  const userId = currentUser?.user_id;
  axios
    .get(`http://127.0.0.1:8000/auth/register/`)
    .then((response) => {
      const user = response.data.find((u) => u.id === userId); // Filter user with matching user_id
      console.log(user); // user object
      console.log(user.roles);
      setRole(user.roles);
    })
    .catch((error) => {
      console.log(error);
    });

  console.log("IMG", images);
  return (
    <Container maxWidth="xl">
    {!open && (
      <>
        <Stack alignItems="center" sx={{ mt: 10 }}>
          <CircularProgress />
        </Stack>
      </>
    )}

    {open && (
      <>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            {role.includes("employee") && (
              <Button variant="outlined" onClick={handleClickOpen}>
                Add Menu
              </Button>
            )}

            <IconButton onClick={handleOpenCart}>
              <Badge badgeContent={totalUniqueItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Grid>
        <Dialog
  open={cartOpen}
  onClose={handleCloseCart}
  sx={{
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
  }}
>
  <DialogTitle sx={{ backgroundColor: "#fff", borderBottom: "1px solid #ccc" }}>
    Cart
  </DialogTitle>
  <DialogContent>
    <DialogContentText>
      {isEmpty ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <List>
          {items.map((item) => {
            const total = item.quantity * item.price;
            return (
              <ListItem key={item.id}>
                <ListItemText
                  primary={
                    <Typography>
                      {item.quantity} x {item.name} * {item.price} = {total}
                    </Typography>
                  }
                />
                <IconButton onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                  <RemoveCircle />
                </IconButton>
                <IconButton onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                  <AddCircle />
                </IconButton>
                <IconButton onClick={() => removeItem(item.id)}>
                  <Delete />
                </IconButton>
              </ListItem>
            );
          })}
          <ListItem sx={{ fontWeight: "bold" }}>
            <ListItemText
              primary={
                <Typography>
                  Grand Total: {items.reduce((acc, item) => acc + item.quantity * item.price, 0)}
                </Typography>
              }
            />
          </ListItem>
        </List>
      )}
    </DialogContentText>
  </DialogContent>
  <DialogActions sx={{ borderTop: "1px solid #ccc", padding: "16px" }}>
    <Button onClick={handleCloseCart}>Cancel</Button>
    <Button variant="contained" onClick={createOrder} sx={{ backgroundColor: "#007bff", color: "#fff" }}>
      Create Order
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={poperOpen}
  onClose={handleClose}
  sx={{
    '& .MuiDialogTitle-root': {
      backgroundColor: '#f5f5f5',
      fontWeight: 'bold',
    },
    '& .MuiDialogContent-root': {
      padding: '20px',
    },
    '& .MuiTextField-root': {
      marginBottom: '10px',
    },
    '& .MuiInputLabel-root': {
      marginBottom: '5px',
      color: '#333',
      fontWeight: 'bold',
    },
    '& .MuiDialogActions-root': {
      padding: '20px',
      justifyContent: 'flex-end',
    },
    '& .MuiButton-root:first-of-type': {
      marginRight: '10px',
    },
  }}
>
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
      onChange={(e) => {
        setName(e.target.value);
      }}
    />
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Price"
      type="number"
      value={price}
      onChange={(e) => {
        setPrice(e.target.value);
      }}
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
      onChange={(e) => {
        setDescription(e.target.value);
      }}
      fullWidth
      variant="outlined"
    />
    <Grid item xs={12} md={6}>
      <InputLabel id="team-select-label">
        Upload menu images
      </InputLabel>
      <input
        type="file"
        multiple
        onChange={handleFileInputChange}
      />
    </Grid>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button
      onClick={createMenu}
      variant="contained"
      color="primary"
    >
      Add
    </Button>
  </DialogActions>
</Dialog>


        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2, mb: 2 }}>
          <TextField
            fullWidth={false}
            style={{
              marginRight: 16,
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: 4,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            placeholder="Search Menu"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />

          <IconButton onClick={handleCloseCart}>
            {/* <AddIcon /> */}
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          {filteredMenus.map((menuItem) => (
            <Grid item key={menuItem.id} xs={12} sm={6} md={3}>
              <Box padding={2}>
                <MenuComponent
                  price={menuItem.price}
                  name={menuItem.name}
                  description={menuItem.description}
                  image={menuItem.images}
                  marginBottom={2}
                />
                <Box display="flex" justifyContent="start">
                  {inCart(menuItem.id) ? (
                    <Button variant="contained" sx={{ backgroundColor: 'red' }} onClick={() => removeItem(menuItem.id)}>
                      Remove
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={() => addItem(menuItem)}>
                      Add to cart
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </>
    )}
  </Container>
  );
};

export default Menus;
