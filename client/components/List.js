import React, { Component, PropTypes } from 'react';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import { dragTypes } from '../constants';
import _ from 'lodash';
import Utils from '../utils/Utils';


const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.updateCardStatus(draggedId, props.id);
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
    this.updateCardPosition = _.throttle(this.props.updateCardPosition, 500);
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
              snippet={card.job_data.snippet}
              cardPositions={this.props.cardPositions}
              updateCardPosition={this.updateCardPosition} />
      );
    });

    return connectDropTarget(
      <div className="list">
        <h1>{this.props.title}</h1>
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