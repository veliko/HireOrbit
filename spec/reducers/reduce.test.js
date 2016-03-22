import ActionType from '../../client/actions/index';
import reducersCard from '../../client/reducers/reducer_cards';
import reducersFilter from '../../client/reducers/reducer_filter';
import index from '../../client/reducers/index';

describe('Reducer::reducersCard', () => {
  it('returns the INITIAL_STATE', () => {
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = reducersCard(undefined, { type: 'unknown' });

    // returns the initial state, not an empty array.
    expect(newState).to.deep.not.equal([]);
  });
});



describe('Reducer::reducersCard', () => {
  it('returns the INITIAL_STATE', () => {
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = reducersCard(undefined, { type: 'unknown' });

    // returns the initial state, not an empty array.
    expect(newState).to.deep.not.equal([]);
  });
});
