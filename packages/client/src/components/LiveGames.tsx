import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameEvent } from '../reducers/gameReducer';

import { rpsIcon } from '../utils/liveGameUtils';
import { Paper, Grid, Container, Typography } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import { RootState } from '../store';
import { GameEvent, GameResult } from '../../../../common/types';

const Game = ({ game }: { game: GameEvent }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Zoom in>
        <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', align: 'center'}}>
          <Typography>{game.playerA.name}</Typography>
          {rpsIcon(Object.prototype.hasOwnProperty.call(game.playerA, 'played') ? (game as GameResult).playerA.played : null)}
          <Typography>vs.</Typography>
          {rpsIcon(Object.prototype.hasOwnProperty.call(game.playerB, 'played') ? (game as GameResult).playerB.played : null)}
          <Typography>{game.playerB.name}</Typography>
        </Paper>
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

  const games = useSelector((state: RootState)=> state);

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