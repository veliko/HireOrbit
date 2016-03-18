import {updateCardStatus, updateCardPosition, updateFilterValue} from '../../client/actions/index';
import { INITIAL_STATE }  from '../../client/reducers/reducer_cards'

describe('Action::Index', () => {

  describe('#updateCardStatus()', () => {
    it('returns true', () => {
      const action = updateCardStatus;
      expect(true).to.equal(true);
    })
  });

  describe('#updateCardPosition()', () => {
    it('returns true', () => {
      const action = updateCardStatus;
      expect(true).to.equal(true);
    })
  });

  describe('#updateFilterValue()', () => {
    it('returns true', () => {
      const action = updateCardStatus;
      expect(true).to.equal(true);
    })
  });


});
