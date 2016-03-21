import { actions } from '../constants';
import update from 'react-addons-update';


export default function (state = {results:[]}, action) {
  switch(action.type){
    case actions.UPDATE_CURRENT_SEARCH:
      console.log("updating current search with results: ", action.payload.jobs);
      return action.payload.jobs;
    default: return state;
  }
}