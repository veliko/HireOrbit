import { actions } from '../constants';


export default function(state = 'normal day', action) {
  console.log('actionaction from reducer Data', action.type)
  switch (action.type) {
    case actions.FETCH_DATA_VIS:
    console.log('INSIDE ACTION', action.payload.searches);
      return action.payload.searches;
    default: return state;
  }
}
