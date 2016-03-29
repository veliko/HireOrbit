import React, { Component, PropTypes } from 'react';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import { dragTypes } from '../constants';
import lodash from 'lodash';
import Utils from '../utils/Utils';

const throttledListHoverHandler = lodash.throttle((props, monitor) => {
  if (monitor.getItem() && props && props.id) {
    const draggedId = monitor.getItem().id;
    props.updateCardStatus(draggedId, props.id);
  }
}, 200);

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
      let sortedEvents = card.events.length === 1 ? 
                         card.events : 
                         card.events.sort((a, b) => (new Date(a.start.dateTime)).getTime() - (new Date(b.start.dateTime)).getTime());
      return (
        <Card id={card.card_id}
              key={card.card_id} 
              status={card.status}
              title={card.job_data.jobtitle}
              company={card.job_data.company}
              rating={card.rating}
              snippet={card.job_data.snippet}
              jobLink={card.job_data.url}
              events={sortedEvents}
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
        <h1>
          {this.props.title + " "} 
          <span className="card-count">{this.props.cards ? this.props.cards.length : 0}</span>
          <span className="fa fa-compress list"></span>
        </h1>
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