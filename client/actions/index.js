import { actions } from '../constants';

export function updateCardStatus(card_id, status) {
  return {
    type: actions.UPDATE_CARD_STATUS,
    payload: {
      card_id,
      status
    }
  }
}

export function updateCardPosition(hoverCardId, cardBelowId) {
  return {
    type: actions.UPDATE_CARD_POSITION,
    payload: {
      hoverCardId,
      cardBelowId
    }
  };
}

export function updateFilterValue(filterValue) {
  return {
    type: actions.UPDATE_FILTER_VALUE,
    payload: {
      filterValue
    }
  };
}

export function updateCurrentSearch(jobs) {
  return {
    type: actions.UPDATE_CURRENT_SEARCH,
    payload: {
      jobs
    }
  };
}

export function fetchSavedSearches(savedSearches) {
  return {
    type: actions.FETCH_SAVED_SEARCHES,
    payload: {
      savedSearches
    }
  }
}

export function addCardsToKanban(cards) {
  return {
    type: actions.ADD_CARDS_TO_KANBAN,
    payload: {
      cards
    }
  }
}