import React, { Component, PropTypes} from 'react';
import ListContainer from '../containers/ListContainer';
import ToolbarContainer from '../containers/ToolbarContainer';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Utils from '../utils/Utils';


class KanbanBoard extends Component {
  constructor() {
    super(...arguments);
    this.filterCardsByStatus = this.filterCardsByStatus.bind(this);
  }

  componentWillMount() {
    var self = this;
    Utils.fetchKanbanCards()
      .done((cards) => {
        console.log('managed to get cards: ', cards);
        self.props.addCardsToKanban(cards);
      })
      .fail((error) => console.log('error fetching cards: ', error));
  }

  filterCardsByStatus(status) {
    return this.props.cards.filter((card) => card.status === status);
  }

  render() {
    return (
      <div className="App">
        <ToolbarContainer />
        <ListContainer id="interested" 
                       title="Interested"
                       cards={this.filterCardsByStatus('interested')} />
        <ListContainer id="applied" 
                       title="Applied"
                       cards={this.filterCardsByStatus('applied')} />
        <ListContainer id="interview" 
                       title="Interview / Follow-up"
                       cards={this.filterCardsByStatus('interview')} />
        <ListContainer id="offer" 
                       title="Offer"
                       cards={this.filterCardsByStatus('offer')} />
      </div>
    );
  }
}

KanbanBoard.propTypes = {
  // cards: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default DragDropContext(HTML5Backend)(KanbanBoard);