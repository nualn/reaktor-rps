import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameEvent } from '../reducers/gameReducer';

import { rpsIcon } from '../utils/liveGameUtils';
import { Card, Grid, Container, Typography, CardContent } from '@mui/material';
import Zoom from '@mui/material/Zoom';

const Game = ({ game }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Zoom in>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent align='center'>
            <Typography>{game.playerA.name}</Typography>
            {rpsIcon(game.playerA.played)}
            <Typography>vs.</Typography>
            {rpsIcon(game.playerB.played)}
            <Typography>{game.playerB.name}</Typography>
          </CardContent>
        </Card>
      </Zoom>
    </Grid>
  );
};

const LiveGames = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket('wss://bad-api-assignment.reaktor.com/rps/live');
    socket.onmessage = (event) => {
      const data = JSON.parse(JSON.parse(event.data));
      console.log(data);
      dispatch(gameEvent(data));
    };
  }, []);

  const games = useSelector(state => state);

  return (
    <Container sx={{ py: 8, overflow: 'auto' }} maxWidth="md">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Ongoing games
      </Typography>
      <Grid container spacing={4}>
        {games.map(game => <Game key={game.gameId} game={game} />)}
      </Grid>
    </Container>
  );
};

export default LiveGames;