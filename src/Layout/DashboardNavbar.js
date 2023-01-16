
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import { Bell as BellIcon } from '../icons/bell';
// import { UserCircle as UserCircleIcon } from '../icons/user-circle';
// import { Users as UsersIcon } from '../icons/users';


export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <AppBar style={{ background: '#FFFFFF' }}
        sx={{
          left: {
            lg: 160
          },
          width: {
            lg: 'calc(100% - 160px)'
          },
        
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon/>
          </IconButton>
         
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              {/* <UsersIcon fontSize="small" /> */}
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
               <NotificationsNoneIcon/>
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
            src="https://picsum.photos/198"
          >
            {/* <UserCircleIcon fontSize="small" /> */}
          </Avatar>
        </Toolbar>
      </AppBar>
    </>
  );
};

