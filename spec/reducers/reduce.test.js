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
});

describe('Reducer::reducerSearch', () => {
  it('Should handle action of unknown type', () => {
    newState = reducerSearch(undefined, action);
    expect(newState.results).to.be.instanceOf(Array);
  });
});

describe('Reducer::reducersSave', () => {
  it('Should handle action of unknown type', () => {
    newState = reducersSave(undefined, action);
    expect(newState).to.be.instanceOf(Array);
  });
});



});
