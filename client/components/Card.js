import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { dragTypes } from '../constants';
import Utils from '../utils/Utils';

const cardDragSpec = {
  beginDrag(props) {
    return {
      id: props.id
    }
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
  endDrag(props) {
    console.log("about to persist card drag event");

    // Utils.persistCardDrag();
  }
}

let collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const cardDropSpec = {
  hover(props, monitor) {
    let hoverCardId = monitor.getItem().id;
    let cardBelowId = props.id;
    let cardBeforeId = props.cardBeforeId;
    if (hoverCardId !== cardBelowId) {
      props.updateCardPosition(hoverCardId, cardBelowId, cardBeforeId);
    }
  }
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
};

class Card extends Component {

  render() {
    const { connectDragSource, connectDropTarget, isDragging } = this.props;

    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: ("#"+((1<<24)*Math.random()|0).toString(16))
    }

    let isDraggingOverlay = <div className="is__dragging__overlay" />;

    return connectDropTarget(connectDragSource(
      <div className="card">
        { isDragging ? isDraggingOverlay : <div style={sideColor} /> }
        <div className="card_title">{this.props.title}</div>
        <div className="card_company_name">{this.props.company}</div>
        <div className="card_details" dangerouslySetInnerHTML={{__html: this.props.snippet}}></div>
      </div>
    ));
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string,
  snippet: PropTypes.string,
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isDragging: PropTypes.bool
}

let CardDragSource = DragSource(dragTypes.CARD, cardDragSpec, collectDrag)(Card);
export default DropTarget(dragTypes.CARD, cardDropSpec, collectDrop)(CardDragSource);
