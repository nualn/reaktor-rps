import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { drawerWidth } from '../utils/config';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CustomAppBar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return <AppBar position="absolute" open={open}>
    <Toolbar>
      <Typography
        align='right'
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, marginRight: '20px', ...(open && { display: 'none' }) }}
      >
      Players
      </Typography>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          ...(open && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
    </Toolbar>
  </AppBar>;
};

export default CustomAppBar;