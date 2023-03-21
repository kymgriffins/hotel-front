import React, { useState, useEffect } from "react";
import { useAuth } from "../Auth/AuthProvider";
import axios from "axios";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {
  FormControlLabel,
  Snackbar,
  Checkbox,
  Grid,
  Box,
  Collapse,
  FormGroup,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useNavigate,Link } from "react-router-dom";

const Signup = () => {
  const [role, setRole]=useState("")
    const { authState } = useAuth();

  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
//   const { signup } = useAuth();
  const URL = `http://127.0.0.1:8000/auth/register/`;
  const [formData, setFormData] = useState({
    username:"",
    email: "",
    password: "",
    roles:""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value );
  };

  const { email, password,roles,username } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a signup request to the server
      // with email and password
      const res = await axios.post(URL, { email, password, roles:role, username });
      // Extract the token from the response
      const token = res.data.access;
      console.log(token, "TOKEN");
      console.log(res)
      
    // signup(token);
      
      // Signup the user by setting the token
      
    } catch (err) {
      setError("Invalid email or password");
    }
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };
  useEffect(() => {
    if (authState.authenticated) {
      navigate("/home");
    }
  }, [authState.authenticated, navigate]);

  return (
    <>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message={snackBarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackBarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />

      <Grid container direction="row">
        <Grid item md={7} xs={12} sx={{ height: "100vh", width: "50%" }}>
          <Grid
            container
            justifyContent="center"
            sx={{ height: "100%" }}
            alignItems="center"
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://images.unsplash.com/photo-1537572263231-4314a30d444f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="Logo"
            />
          </Grid>
          {/* Logo or image goes here */}
        </Grid>

        <Grid md={5} xs={12} item>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx={{ height: "100%", width: "100%", px: 10 }}
          >
            <Typography
              variant="h4"
              sx={{ letterSpacing: 4, mb: 6 }}
              // color="primary"
            >
              {" "}
              HOTEL MANAGEMENT
            </Typography>
            {/* <Typography variant="body1" sx={{ mb: 2 }} color="#aaaaaa">
              Fill in the following details to signup
            </Typography> */}
            <TextField
              type="text"
              required
              variant="outlined"
              id="username"
              name="username"
              autoFocus
              onChange={handleChange}
              fullWidth={true}
              sx={{ mb: 4, mt: 2 }}
              label="Username"
              inputProps={{ autoComplete: "off" }}
              value={formData.username}
            />
            
            <TextField
              type="text"
              required
              variant="outlined"
              id="email"
              name="email"
              autoComplete="new-password"
              autoFocus
              onChange={handleChange}
              fullWidth={true}
              sx={{ mb: 4, mt: 2 }}
              label="Email"
              inputProps={{ "data-testid": "emailInput", autoComplete: "off" }}
              value={formData.email}
            />

            <TextField
              onChange={handleChange}
              label="Password"
              required
              variant="outlined"
              name="password"
              type="password"
              value={formData.password}
              autoFocus={false}
              fullWidth={true}
            />
             <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          autoWidth
          label="Role"
          onChange={handleRoleChange}
          sx={{mt:2}}
        >
          <MenuItem value={"employee"}>Employee</MenuItem>
          <MenuItem value={"customer"}>Customer</MenuItem>
         
        </Select>
      </FormControl>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              sx={{ mt: 4 }}
            >
              {/* <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember me"
                  sx={{ color: "#5c61c5" }}
                />
              </FormGroup> */}
              <Link variant="body2" to='/login' className="link" sx={{ textDecoration: 'none', color: "primary", mt: 1.5 }}> 
             Already have an account? Login
              </Link>
              <Link variant="body2" to='/forgot-password' className="link" sx={{ textDecoration: 'none', color: "primary", mt: 1.5 }}> 
              Forgot password?
              </Link>
            </Grid>
            <Button
              sx={{ mt: 5 }}
              type="submit"
              onClick={handleSubmit}
              variant="contained"
            >
              Signup
            </Button>
            {/* <Button type='submit' primaryText="Signup" onClick={signup} /> */}
          </Grid>
        </Grid>
      </Grid>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, px: 15 }}
      >
        {/* <Collapse in={showAlert} sx={{ marginBottom: 1, marginTop: 1 }}>
				<AlertMessage type={alertDetails.type} title={alertDetails.title} message={alertDetails.message} />
			</Collapse> */}

        {/* <LoadingButton sx={{ mt: 5 }} type="submit" loading={logUserIn.isLoading} primaryText="Signup" loadingText="Logging in"></LoadingButton> */}
      </Box>
    </>
  );
};

export default Signup;
