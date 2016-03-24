import { combineReducers } from 'redux';
import cardsReducer from './reducer_cards';
import filterReducer from './reducer_filter';
import currentSearchReducer from './reducer_current_search';
import savedSearchesReducer from './reducer_saved_searches';
import dataVisReducer from './reducer_data_vis';

const rootReducer = combineReducers({
  cards: cardsReducer,
  filter: filterReducer,
  currentSearch: currentSearchReducer,
  savedSearches: savedSearchesReducer,
  dataVisual: dataVisReducer
});

export default rootReducer;
