import { combineReducers } from 'redux';
import cardsReducer from './reducer_cards';
import filterReducer from './reducer_filter';

const rootReducer = combineReducers({
  cards: cardsReducer,
  filter: filterReducer
});

export default rootReducer;