const gameReducer = (state = [], action) => {
  switch(action.type) {
    case 'GAME_BEGIN': {
      return [...state, action];
    }
    case 'GAME_RESULT': {
      const ongoingGame = state.find(game => game.gameId === action.gameId);
      if (ongoingGame)  {
        return state.map(game => game === ongoingGame ? action : game);
      }
      return [...state, action];
    }
    case 'GAME_REMOVE': {
      return state.filter(game => game.gameId !== action.gameId);
    }
    default: {
      return state;
    }
  }
};

export const gameEvent = data => {
  return async dispatch => {
    dispatch(data);
    if (data.type === 'GAME_RESULT') {
      setTimeout(() => {
        dispatch({
          type: 'GAME_REMOVE',
          gameId: data.gameId
        });
      }, 5000);
    }
  };
};

export default gameReducer;