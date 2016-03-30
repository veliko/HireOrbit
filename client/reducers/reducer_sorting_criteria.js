import { actions } from '../constants';

export default function (state = 'none', action) {
  switch(action.type){

    case actions.CHANGE_SORTING_CRITERIA:
      return action.payload.sortingCriteria;

    default: return state;
  }
}
