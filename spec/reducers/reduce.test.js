import ActionType from '../../client/actions/index';
import reducersCard from '../../client/reducers/reducer_cards';
import reducersFilter from '../../client/reducers/reducer_filter';
import reducerSearch from '../../client/reducers/reducer_current_search';
import reducersSave from '../../client/reducers/reducer_saved_searches';
import { actions } from '../../client/constants';
import index from '../../client/reducers/index';
import { expect } from '../support/setup.mocha.js'


describe('Reducers', () => {
let newState;
let action = { type: 'unknown'};
describe('Reducer::reducersCard', () => {
  it('Should handle action of unknown type', () => {
    newState = reducersCard(undefined, action);
    expect(newState).to.be.instanceOf(Array);
  });
});

describe('Reducer::reducersFilter', () => {
  it('Should handle action of unknown type', () => {
    newState = reducersFilter(undefined, action);
    expect(newState).to.be.a('string');
  });

  it('Should handle action of UPDATE_FILTER_VALUE', () => {
      const action = { type: actions.UPDATE_FILTER_VALUE, payload: {filterValue: 'software'} };
      expect(reducersFilter('', action)).to.contain('software');
  });

});

describe('Reducer::reducerSearch', () => {
  it('Should handle action of unknown type', () => {
    newState = reducerSearch(undefined, action);
    expect(newState.results).to.be.instanceOf(Array);
  });

  it('Should handle action of UPDATE_CURRENT_SEARCH', () => {
      const action = { type: actions.UPDATE_CURRENT_SEARCH, payload: {jobs: 'software engineer'} };
      expect(reducerSearch({results: []}, action)).to.contain('software engineer');
  });

});

describe('Reducer::reducersSave', () => {
  it('Should handle action of unknown type', () => {
    newState = reducersSave(undefined, action);
    expect(newState).to.be.instanceOf(Array);
  });

  it('Should handle action of FETCH_SAVED_SEARCHES', () => {
      const action = { type: actions.FETCH_SAVED_SEARCHES, payload: {savedSearches: ['software engineer', 'full stack engineer', 'medical assistent']} };
      expect(reducersSave([], action).length).to.be.eql(3);
  });

});



});
