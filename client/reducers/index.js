import { combineReducers } from 'redux';
import cardsReducer from './reducer_cards';
import filterReducer from './reducer_filter';
import currentSearchReducer from './reducer_current_search';
import savedSearchesReducer from './reducer_saved_searches';

const rootReducer = combineReducers({
  cards: cardsReducer,
  filter: filterReducer,
  currentSearch: currentSearchReducer,
  savedSearches: savedSearchesReducer
});

export default rootReducer;