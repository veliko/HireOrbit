import React, { Component, PropTypes} from 'react';
import ListContainer from '../containers/ListContainer';
import ToolbarContainer from '../containers/ToolbarContainer';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Utils from '../utils/Utils';
import Auth from '../utils/Auth';
import {browserHistory} from 'react-router'
import AddCardButton from './AddCardButton';
import Modal from 'react-awesome-modal';
import Moment from 'moment';
import CardForm from './CardForm';


class KanbanBoard extends Component {
  constructor() {
    super(...arguments);
    this.filterCardsByStatusAndSort = this.filterCardsByStatusAndSort.bind(this);
    this.state = {
      modalVisible: false
    }
  }

  componentWillMount() {
    var self = this;
    Utils.fetchKanbanCards()
      .done((cards) => {
        console.log('managed to get cards: ', cards);
        self.props.addCardsToKanban(cards);
      })
      .fail((error) => {
        console.log('error fetching cards: ', error)
        if(error.status === 401){
          browserHistory.push('/logout')
        }
      });
  }

  filterCardsByStatusAndSort(status, sortBy) {
    console.log("Will be sorting cards by: ", sortBy);
    let filteredCards = this.props.cards.filter((card) => card.status === status);
    if (sortBy === 'stars') {
      filteredCards.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'events') {
      filteredCards.sort((a, b) => {
        if (a.events[0] && b.events[0]) {
          let isBefore = Moment(a.events[0].start.dateTime).isBefore(b.events[0].start.dateTime)
          return isBefore ? -1 : 1;
        } else if (a.events[0] && !b.events[0]) {
          return -1;
        } else if (b.events[0] && !a.events[0]) {
          return 1;
        } else if (!a.events[0] && !b.events[0]) {
          return b.rating - a.rating;
        }
      });
    }
    return filteredCards;
  }

  toggleModalState() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  render() {
    return (
      <div className="App">
        <ToolbarContainer />
        <AddCardButton toggleModalState={this.toggleModalState.bind(this)}/> 
        <ListContainer id="interested" 
                       title="Interested"
                       cards={this.filterCardsByStatusAndSort('interested', this.props.sortBy)} />
        <ListContainer id="applied" 
                       title="Applied"
                       cards={this.filterCardsByStatusAndSort('applied', this.props.sortBy)} />
        <ListContainer id="interview" 
                       title="Interview / Follow-up"
                       cards={this.filterCardsByStatusAndSort('interview', this.props.sortBy)} />
        <ListContainer id="offer" 
                       title="Offer"
                       cards={this.filterCardsByStatusAndSort('offer', this.props.sortBy)} />
        <Modal visible={this.state.modalVisible}
               effect="fadeInDown"
               width="400"
               height="300">
          <h1>Add a New Card</h1>
          <CardForm cards={this.props.cards} 
                    cardData={null} 
                    addCardsToKanban={this.props.addCardsToKanban}
                    toggleModalState={this.toggleModalState.bind(this)}
                    />
        </Modal>
      </div>
    );
  }
}

KanbanBoard.propTypes = {
  // cards: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default DragDropContext(HTML5Backend)(KanbanBoard);