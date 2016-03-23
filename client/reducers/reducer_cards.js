import { actions } from '../constants';
import update from 'react-addons-update';
import Utils from '../utils/Utils';


export default function(state = [], action) {
  switch (action.type) {
    
    case actions.FETCH_CARDS_FROM_DB:
      return action.payload.cards;

    case actions.ADD_CARDS_TO_KANBAN: 
      let duplicatesRemoved = action.payload.cards.filter((card) => {
        var cardExists = state.find((existingCard) => card.card_id === existingCard.card_id);
        return !cardExists;
      });
      return update(state, {
        $push: [...duplicatesRemoved]
      });
    
    case actions.UPDATE_CARD_STATUS:
      let cardIndex = state.findIndex((card) => card.card_id === action.payload.card_id);
      return update(state, {
        [cardIndex]: {
            status: {$set: action.payload.status}
          }
      });

    case actions.UPDATE_CARD_POSITION: 
      let draggedCardIndex = state.findIndex((card) => card.card_id === action.payload.hoverCardId);
      let dropTargetCardIndex = state.findIndex((card) => card.card_id === action.payload.cardBelowId);

      let draggedCard = state[draggedCardIndex];
      let dropTargetCard = state[dropTargetCardIndex];

      return update(state, {
        $splice: [
          [draggedCardIndex, 1],
          [dropTargetCardIndex, 0, draggedCard]
        ]
      });

    case actions.ADD_EVENT_TO_CARD:
      let event = action.payload.event;
      cardIndex = state.findIndex((card) => card.card_id === action.payload.event.card_id);

      return update(state, {
        [cardIndex]: {
          events: {
            $push: [event]
          }
        }
      });

    case actions.DELETE_EVENT_FROM_CARD:
      let evt = action.payload.event;
      cardIndex = state.findIndex((card) => card.card_id === evt.card_id);
      let eventIndex = state[cardIndex].events.findIndex((e) => e.event_id === evt.event_id);

      // console.log("event: ", evt);
      // console.log("card index: ", cardIndex, "eventIndex: ", eventIndex);
      return update(state, {
        [cardIndex]: {
          events: {
            $splice: [
              [eventIndex, 1]
            ]
          }
        }
      })

    case actions.DELETE_CARD_FROM_KANBAN: 
      let cardToBeDeletedIndex = state.findIndex((card) => card.card_id === action.payload.card_id);
      let updatedState = update(state, {
        $splice: [
          [cardToBeDeletedIndex, 1]
        ]
      });

      let card_positions = updatedState.reduce((result, card, index) => {
        result[card.card_id] = index;
        return result;
      }, {})

      console.log('updated state looks like this: ', updatedState);
      console.log('card_positions look like this: ', card_positions);

      Utils.deleteCardFromKanban(action.payload.card_id, card_positions)
      .done(() => console.log('Successfully deleted card from Kanban'))
      .fail((error) => console.log('Error while deleting card from Kanban'));
      return updatedState;
    
    default: return state;
  }
}
