import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { drawerWidth } from '../utils/config';
import { Toolbar, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandablePlayerTable from './ExpandablePlayerTable';
import playerService from '../services/players';
import { DrawerProps } from '../../../../common/types';


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

const CustomDrawer = ({ open, toggleDrawer }: DrawerProps) => {
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    playerService.getPlayers()
    .then(fetchedPlayersObj => {
      setPlayers(fetchedPlayersObj.players);
    });
  }, [open]);

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
      </Toolbar>
      {open ? <ExpandablePlayerTable players={players}/> : null}
    </Drawer>
  );
};

export default CustomDrawer;