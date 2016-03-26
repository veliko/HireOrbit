import React, { Component, PropTypes } from 'react';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import { dragTypes } from '../constants';
import lodash from 'lodash';
import Utils from '../utils/Utils';

const throttledListHoverHandler = lodash.throttle((props, monitor) => {
  const draggedId = monitor.getItem().id;
  // if (monitor.getItem().status !== props.id) {
    props.updateCardStatus(draggedId, props.id);
  // }
}, 100);

const listTargetSpec = {
  hover(props, monitor) {
    throttledListHoverHandler(props, monitor);
  },
  drop(props, monitor) {
    let card_id = monitor.getItem().id;
    let status = props.id;
    let newCardStatusInfo = {
      card_id,
      status
    }
    Utils.persistCardStatus(newCardStatusInfo)
    .done(() => console.log("Successfully persited card status"))
    .fail((error) => console.log("Error while persisting card status: ", error));
  }
};

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
};

class List extends Component {
  constructor() {
    super(...arguments);
  }
  render() {
    // console.log("card positions are: ", this.props.cardPositions);
    const { connectDropTarget } = this.props;
    var cards = this.props.cards.map((card) => {
      return (
        <Card id={card.card_id}
              key={card.card_id} 
              status={card.status}
              title={card.job_data.jobtitle}
              company={card.job_data.company}
              rating={card.rating}
              snippet={card.job_data.snippet}
              events={card.events}
              notes={card.notes}
              cardPositions={this.props.cardPositions}
              updateCardPosition={this.props.updateCardPosition}
              addEventToCard={this.props.addEventToCard}
              deleteEventFromCard={this.props.deleteEventFromCard}
              deleteCardFromKanban={this.props.deleteCardFromKanban}
              updateCardNotes={this.props.updateCardNotes}
              changeCardRating={this.props.changeCardRating} />
      );
    });

    return connectDropTarget(
      <div className="list">
        <h1>{this.props.title} <span className="card-count">{this.props.cards ? this.props.cards.length : 0}</span></h1>
        {cards}
      </div>
    );
  }
}

List.propTypes = {
  id: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(dragTypes.CARD, listTargetSpec, collect)(List);