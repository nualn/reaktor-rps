import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LiveGames from './components/LiveGames';
import CustomAppBar from './components/CustomAppBar';

const App = () => {
  return (
    <Container maxWidth="md">
      <CustomAppBar/>
      <Box sx={{ my: 4 }}>
        <LiveGames/>
      </Box>
    </Container>
  );
};

export default App;
