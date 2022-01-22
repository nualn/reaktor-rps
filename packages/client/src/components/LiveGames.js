import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameEvent } from '../reducers/gameReducer';

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

  return (
    <div>
      <ul>
        {useSelector(state => state).map(game => <li key={game.gameId}>{JSON.stringify(game)}</li>)}
      </ul>
    </div>
  );
};

export default LiveGames;