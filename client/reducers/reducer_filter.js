import { actions } from '../constants';

const INITIAL_STATE = '';

export default function(state = '', action) {
  switch (action.type) {
    case actions.UPDATE_FILTER_VALUE: 
      return action.payload.filterValue;
    default: return state;
  }
}