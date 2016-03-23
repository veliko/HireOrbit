import React, { Component, PropTypes } from 'react';
import List from '../components/List';
import { connect } from 'react-redux';
import { updateCardStatus, updateCardPosition, addEventToCard } from '../actions';

class ListContainer extends Component {
  render() {
    return (
      <List {...this.props}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    cardPositions: state.cards.reduce((result, card, index) => {
      result[card.card_id] = index;
      return result;
    }, {})
  };
}

ListContainer.propTypes = {
  updateCardStatus: PropTypes.func.isRequired,
  updateCardPosition: PropTypes.func.isRequired
}

export { ListContainer };
export default connect(mapStateToProps, { updateCardStatus, updateCardPosition, addEventToCard })(ListContainer);
