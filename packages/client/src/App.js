import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameEvent } from './reducers/gameReducer';

const App = () => {
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
    <div className="App">
      <header className="App-header">
        <ul>
          {useSelector(state => state).map(game => <li key={game.gameId}>{JSON.stringify(game)}</li>)}
        </ul>
      </header>
    </div>
  );
};

export default App;
