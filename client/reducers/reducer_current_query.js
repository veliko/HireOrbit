import { actions } from '../constants';

export default function(state = {}, action) {
  switch (action.type) {
    case actions.UPDATE_CURRENT_QUERY: 
      return action.payload.currentQuery;
    default: return state;
  }
}