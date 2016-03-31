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
      modalVisible: false,
      expandedLists: 4
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

  updateNumberOfExpandedLists(listStatus) {
    this.setState({
      expandedLists: this.state.expandedLists + listStatus
    });
  }

  render() {
    console.log("number of expanded lists: ", this.state.expandedLists);
    return (
      <div className="App__Kanban">
        <ToolbarContainer />
        <AddCardButton toggleModalState={this.toggleModalState.bind(this)}/> 
        <ListContainer id="interested" 
                       title="Interested"
                       description="Your newly added cards will first show-up in this column"
                       cards={this.filterCardsByStatusAndSort('interested', this.props.sortBy)}
                       numberOfExpandedLists={this.state.expandedLists}
                       updateNumberOfExpandedLists={this.updateNumberOfExpandedLists.bind(this)} />
        <ListContainer id="applied" 
                       title="Applied"
                       description="Drag cards here once you apply for the jobs they represent"
                       cards={this.filterCardsByStatusAndSort('applied', this.props.sortBy)}
                       numberOfExpandedLists={this.state.expandedLists}
                       updateNumberOfExpandedLists={this.updateNumberOfExpandedLists.bind(this)} />
        <ListContainer id="interview" 
                       title="Interview / Follow-up"
                       description="Drag any cards here for which you have a scheduled interview. "
                       cards={this.filterCardsByStatusAndSort('interview', this.props.sortBy)}
                       numberOfExpandedLists={this.state.expandedLists}
                       updateNumberOfExpandedLists={this.updateNumberOfExpandedLists.bind(this)} />
        <ListContainer id="offer" 
                       title="Offer"
                       description="Hurry up and fill this column. We know you can!"
                       cards={this.filterCardsByStatusAndSort('offer', this.props.sortBy)}
                       numberOfExpandedLists={this.state.expandedLists}
                       updateNumberOfExpandedLists={this.updateNumberOfExpandedLists.bind(this)} />
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