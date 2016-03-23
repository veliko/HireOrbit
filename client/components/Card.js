import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { dragTypes } from '../constants';
import Utils from '../utils/Utils';

import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import numberLocalizer from 'react-widgets/lib/localizers/simple-number'
// Localizers for Datepicker
numberLocalizer();
momentLocalizer(Moment);

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
    let cardStatusAndPositions = {
      card_id: props.id,
      status: props.status,
      cardPositions: props.cardPositions
    }
    Utils.persistCardStatusAndPositions(cardStatusAndPositions)
    .done(() => console.log("Succesfully persisted card drag."))
    .fail((error) => console.log("Failed to persist card drag: ", error))
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
  getStartDateTime(date, dateStr) {
    this.startDate = Moment(date).toISOString();
  }

  getEndDateTime() {
    return Moment(this.startDate).add(10, 'minutes').toISOString();
  }

  saveEvent(){
    let self = this;
    let summary = self.refs.eventInput.value;
    let event = {
      start: {
        dateTime: self.startDate 
      },
      end: {
        dateTime: self.getEndDateTime()
      },
      summary
    }
    let addEventObj = {
      event: event,
      card_id: self.props.id
    }
    console.log(addEventObj);

    Utils.addGCalEvent(addEventObj)
      .done((results) => {
        console.log('Successfully added event: ', results)
        // call redux to update card state
      })
      .fail((err) => console.log.bind(console))
  }

  render() {
    var widgets = (<div>
        <DateTimePicker onChange={this.getStartDateTime.bind(this)} defaultValue={new Date()} placeholder='Enter start date/time' />
        <button className="bigassbutton" type="button" onClick={this.saveEvent.bind(this)}>{'Save Event'}</button>
        <input type='text' ref="eventInput" placeholder="enter event description.." />
      </div>)

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
        {widgets}
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
