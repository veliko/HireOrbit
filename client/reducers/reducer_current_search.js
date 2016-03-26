import { actions } from '../constants';
import update from 'react-addons-update';


export default function (state = {results:[]}, action) {
  switch(action.type){
    
    case actions.UPDATE_CURRENT_SEARCH:
      return action.payload.jobs;

    default: return state;
  }
}