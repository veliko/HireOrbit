import { actions } from '../constants';


export default function(state = '', action) {
  switch (action.type) {
    case actions.UPDATE_FILTER_VALUE:
      return 'nothing in here';
    default: return state;
  }
}
