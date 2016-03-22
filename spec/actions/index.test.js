import * as action from '../../client/actions/index';
import { expect } from '../support/setup.mocha';
import { INITIAL_STATE }  from '../../client/reducers/reducer_cards'
import {actions} from '../../client/constants';


describe('Actions', () => {

  describe('#updateCardStatus()', () => {
    const updateCardStatus = action.updateCardStatus('837bbee9c53d1557', 'interested');
    it('has the correct type', () => {
      expect(updateCardStatus.type).to.be.equal(actions.UPDATE_CARD_STATUS);
    });

    it('has the correct payload', () => {
      expect(updateCardStatus.payload).to.contain({card_id: '837bbee9c53d1557', status: 'interested'});
    });

  });

  describe('#updateCardPosition()', () => {
    const updateCardPosition = action.updateCardPosition(3,4,5);
    it('has the correct type', () => {
      expect(updateCardPosition.type).to.be.eql(actions.UPDATE_CARD_POSITION);
    })
  });

  describe('#updateFilterValue()', () => {
    const updateFilterValue = action.updateFilterValue('software');
    it('has the correct type', () => {
      expect(updateFilterValue.type).to.be.eql(actions.UPDATE_FILTER_VALUE);
    });

    it('has the correct payload', () => {
      expect(updateFilterValue.payload).to.contain({filterValue: 'software'});
    });

  });

  describe('#updateCurrentSearch()', () => {
    const updateCurrentSearch = action.updateCurrentSearch('software engineer');
    it('has the correct type', () => {
      expect(updateCurrentSearch.type).to.equal(actions.UPDATE_CURRENT_SEARCH);
    });

    it('has the correct payload', () => {
      expect(updateCurrentSearch.payload).to.contain({jobs: 'software engineer'});
    });

  });

  describe('#fetchSavedSearches()', () => {
    const fetchSavedSearches = action.fetchSavedSearches([]);
    it('has the correct type', () => {
      expect(fetchSavedSearches.type).to.equal(actions.FETCH_SAVED_SEARCHES);
    });
  });

  describe('#addCardsToKanban()', () => {
    const addCardsToKanban = action.addCardsToKanban('Card');
    it('has the correct type', () => {
      expect(addCardsToKanban.type).to.equal(actions.ADD_CARDS_TO_KANBAN);
    })
  });


});
