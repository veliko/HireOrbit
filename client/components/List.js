import React, { Component, PropTypes } from 'react';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import { dragTypes } from '../constants';


const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.updateCardStatus(draggedId, props.id);
  }
};

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
};

class List extends Component {
  render() {
    const { connectDropTarget } = this.props;
    var cards = this.props.cards.map((card) => {
      return (
        <Card id={card.card_id}
              key={card.card_id} 
              title={card.job_data.jobtitle}
              company={card.job_data.company}
              snippet={card.job_data.snippet}
              updateCardPosition={this.props.updateCardPosition} />
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