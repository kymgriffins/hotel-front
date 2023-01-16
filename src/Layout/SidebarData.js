import HomeIcon from '@mui/icons-material/Home'; 
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import FaceIcon from '@mui/icons-material/Face';
import SearchIcon from '@mui/icons-material/Search';
export const SidebarData =[
    
    {
        title:"Dashboard", 
        icon : <DashboardIcon/>, 
        path : "/dashboard",
    },
    {
        title:"Cases", 
        icon : <WorkIcon/>, 
        path : "/cases",
    },
    {
        title:"Search", 
        icon : <SearchIcon/>, 
        path : "/search",
    },
   
    // {
    //     title:"Profile", 
    //     icon : <FaceIcon/>, 
    //     path : "/profile",
    // },
]