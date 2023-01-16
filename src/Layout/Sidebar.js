import React from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css'
import {Typography} from '@mui/material'
import { SidebarData } from './SidebarData';
export const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="Sidebar">
            <div className="Sidebar-header" sx={{ mb: 4, mt: 2 }}>
                <div className="Sidebar-header-logo" sx={{ mb: 4, mt: 2 }}>
                    <Typography style={{color: 'white' , margin:10, fontSize:20, fontWeight: 'bold'}}> TAFITI </Typography>
                </div>
            </div>
            {
                SidebarData.map((item, index) => {
                    return (
                        <ul className="sidebar-list">
                            <li key={index} className="sidebar-item-list"
                                id={window.location.pathname === item.path  ? "active" : ""}
                                // onClick={() => {
                                //     navigate(item.path)
                                // }}
                                >

                                <div className="sidebar-item-icon"> {item.icon} </div>
                                <div className="sidebar-item-title"> {item.title} </div>
                            </li>
                        </ul>
                    )
                })
            }
        </div>
    );
}