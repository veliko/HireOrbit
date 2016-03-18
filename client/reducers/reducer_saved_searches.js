import { actions } from '../constants';
import update from 'react-addons-update';


export default function (state = [], action) {
  switch(action.type){
    
    case actions.FETCH_SAVED_SEARCHES:
      return action.payload.savedSearches || [];
    
    default: return state;
  }
}