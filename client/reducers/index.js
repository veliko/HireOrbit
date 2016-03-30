import { combineReducers } from 'redux';
import cardsReducer from './reducer_cards';
import filterReducer from './reducer_filter';
import currentSearchReducer from './reducer_current_search';
import savedSearchesReducer from './reducer_saved_searches';
import currentQueryReducer from './reducer_current_query';
import dataVisReducer from './reducer_data_vis';

const rootReducer = combineReducers({
  cards: cardsReducer,
  filter: filterReducer,
  currentSearch: currentSearchReducer,
  currentQuery: currentQueryReducer,
  savedSearches: savedSearchesReducer,
  dataVisual: dataVisReducer
});

export default rootReducer;
