import React, { Component, PropTypes } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import { connect } from 'react-redux';

class KanbanBoardContainer extends Component {
  constructor() {
    super();
    this.filterCardsByGlobalFilterValue = this.filterCardsByGlobalFilterValue.bind(this);
  }

  filterCardsByGlobalFilterValue(filterValue) {
    return this.props.cards.filter((card) => {
      let cardString = JSON.stringify(card).toLowerCase();
      return cardString.indexOf(filterValue.toLowerCase()) >= 0;
    });
  }

  render() {
    let filterValue = this.props.filter;
    console.log("inside KnbanBoardContainer: ", this.props.cards);
    return (
      <KanbanBoard cards={this.filterCardsByGlobalFilterValue(filterValue)} />
    );
  }
}

KanbanBoardContainer.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
    filter: state.filter
  }
}
export { KanbanBoardContainer };
export default connect(mapStateToProps, null)(KanbanBoardContainer);
