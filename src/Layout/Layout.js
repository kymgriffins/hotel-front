import React, { useEffect } from "react";
import {Sidebar} from "./Sidebar";
import Box from "@mui/material/Box";
import { Grid, Hidden } from "@mui/material";
import { useTheme } from "@mui/system";


 export const Layout = ({children}) => {

  return (
   
      <Grid container>
        <Grid item xs={1} lg={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={11} lg={11}>
         
                {children}
           
        </Grid>
      </Grid>
  
  );
}