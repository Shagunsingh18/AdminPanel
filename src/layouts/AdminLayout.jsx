// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  LayoutDashboard,
  Users as UsersIcon,
  GraduationCap,
  Settings,
  BarChart3,
  PieChart as PieChartIcon,
  ShieldCheck,
  Wrench,
  Shuffle,
} from 'lucide-react';

import { styled, useTheme } from '@mui/material/styles';
import { useContext } from 'react';

const drawerWidth = 240;

/* Styled main content to push below AppBar */
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? drawerWidth : 0,
  [theme.breakpoints.down('md')]: {
    marginLeft: 0, // on mobile the drawer is temporary
  },
}));

function AdminLayout() {
  const muiTheme = useTheme();
const isDesktop = useMediaQuery(muiTheme.breakpoints.up('md'));

  
  const [open, setOpen] = React.useState(isDesktop); // keep open on desktop

  // Close temporary drawer on route change (mobile UX)
  const handleNavClick = () => {
    if (!isDesktop) setOpen(false);
  };

  const drawer = (
    <div className=' text-black font-bold h-full bg-gray-300'  >
      <Toolbar />
      <List>
        <ListItemButton component={NavLink} to="/">
        <ListItemIcon><LayoutDashboard size={30} /></ListItemIcon>
        <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/users">
        <ListItemIcon><UsersIcon size={30} /></ListItemIcon>
        <ListItemText primary="Users" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/courses">
        <ListItemIcon><GraduationCap size={30} /></ListItemIcon>
        <ListItemText primary="Courses" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/settings">
        <ListItemIcon><Settings size={30} /></ListItemIcon>
        <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/reports">
        <ListItemIcon><BarChart3 size={30} /></ListItemIcon>
        <ListItemText primary="Reports" />
        </ListItemButton>

         <ListItemButton component={NavLink} to="/analytics">
         <ListItemIcon><PieChartIcon size={30} /></ListItemIcon>
         <ListItemText primary="Analytics" />
         </ListItemButton>

         <ListItemButton component={NavLink} to="/security">
         <ListItemIcon><ShieldCheck size={30} /></ListItemIcon>
         <ListItemText primary="Security" />
         </ListItemButton>

          <ListItemButton component={NavLink} to="/maintenance">
          <ListItemIcon><Wrench size={30} /></ListItemIcon>
          <ListItemText primary="Maintenance" />
          </ListItemButton>

      </List>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-sky-300 via-teal-300 to-purple-300">


      {/* Top bar */}
      <AppBar position="fixed" sx={{ zIndex: muiTheme.zIndex.drawer + 1 }}>

        <Toolbar>
          {!isDesktop && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen(!open)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
           SkillTrack Admin
          </Typography>

        </Toolbar>
      </AppBar>

       <Drawer
        variant={isDesktop ? 'persistent' : 'temporary'}
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,    
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>


      {/* Main content */}
      <Main open={open}>
        <Toolbar /> {/* Spacer equals AppBar height */}
        <Outlet />

      </Main>
    </div>
  );
}

export default AdminLayout;


