import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import gameReducer from './reducers/gameReducer';
import thunk from 'redux-thunk';

const store = createStore(
  gameReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;