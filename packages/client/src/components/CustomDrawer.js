import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { drawerWidth } from '../utils/config';
import { Toolbar, IconButton, Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const CustomDrawer = ({ open, toggleDrawer }) => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer} sx={{ marginRight: 'auto' }}>
          <ChevronRightIcon />
        </IconButton>
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 435, height: 40, borderRadius: 10 }}
        >
          <SearchIcon sx={{ marginLeft: 1 }} />
          <InputBase
            fullWidth
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Players"
            inputProps={{ 'aria-label': 'search players' }}
          />
        </Paper>
      </Toolbar>
    </Drawer>
  );
};

export default CustomDrawer;