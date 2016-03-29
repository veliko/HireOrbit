import { combineReducers } from 'redux';
import cardsReducer from './reducer_cards';
import filterReducer from './reducer_filter';
import currentSearchReducer from './reducer_current_search';
import savedSearchesReducer from './reducer_saved_searches';
import currentQueryReducer from './reducer_current_query';
import dataVisReducer from './reducer_data_vis';
import sortingCriteriaReducer from './reducer_sorting_criteria';

const rootReducer = combineReducers({
  cards: cardsReducer,
  filter: filterReducer,
  currentSearch: currentSearchReducer,
  dataVisual: dataVisReducer,
  sortingCriteria: sortingCriteriaReducer,
  savedSearches: savedSearchesReducer
});

export default rootReducer;
