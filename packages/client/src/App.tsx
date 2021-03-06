import React, { useState } from 'react';
import Box from '@mui/material/Box';
import LiveGames from './components/LiveGames';
import CustomAppBar from './components/CustomAppBar';
import CustomDrawer from './components/CustomDrawer';

const App = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', maxHeight: '100vh' }}>
      <CustomAppBar open={open} toggleDrawer={toggleDrawer}/>
      <LiveGames/>
      <CustomDrawer open={open} toggleDrawer={toggleDrawer}/>
    </Box>
  );
};



export default App;
