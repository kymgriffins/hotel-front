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
} from "@mui/material";
import { DataGridLayout } from "../Layout/DataGridLayout";
import { DataGrid } from "@mui/x-data-grid";
import MenuComponent from "../Components/MenuComp";
import Backdrop from "@mui/material/Backdrop";
const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:8000/menu").then((response) => {
      setMenus(response.data);
      setOpen(true);
    });
  }, []);
  console.log("menus", menus);
  const columns = [
    { field: "id", headerName: "id", description: "", flex: 0.1 },
    { field: "name", headerName: "Name", description: "", flex: 0.1 },
    { field: "price", headerName: "Price", description: "", flex: 0.1 },
    // { field: "quantity", headerName: "Quantity", description: "", flex: 0.1 },
  ];
  // const displayMenus=()=>{
  //   if(menus.length > 0){
  //    const mappedMenu= menus.map((menu, index)=>{

  //       return(

  //       )
  //     }

  //     )
  //     console.log("MENU",mappedMenu)
  //   }

  // }
  return (
    <Container maxWidth="xl">
      {!open &&(
        <>
         <Stack alignItems="center">
  <CircularProgress />
</Stack>
        </>
      )}
      {open &&(
<>
<Grid container spacing={2}>
        {menus.map((menu) => (
          <Grid container p={2} md={3}>
            <MenuComponent
              price={menu.price}
              name={menu.name}
              description={menu.description}
            />
          </Grid>
        ))}
      </Grid>
</>
      )}
      
    </Container>
  );
};

export default Menus;
