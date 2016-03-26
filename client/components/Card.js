import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { dragTypes } from '../constants';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Utils from '../utils/Utils';
import RemoveCard from './RemoveCard';
import CardStatusBar from './CardStatusBar';
import RemoveButton from './RemoveButton';
import NotesList from './NotesList';
import Rating from 'react-rating';

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
      id: props.id,
      status: props.status
    }
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
  endDrag(props) {
    // console.log("about to persist card drag event");
    let cardPositions = {
      card_id: props.id,
      cardPositions: props.cardPositions
    }
    Utils.persistCardPositions(cardPositions)
      .done(() => console.log("Succesfully persisted card drag."))
      .fail((error) => console.log("Failed to persist card drag: ", error));
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
    if (hoverCardId !== cardBelowId){
      props.updateCardPosition(hoverCardId, cardBelowId);
    }
  }
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  }
};

class Card extends Component {
  
  constructor() {
    super();
    this.state = {
      showDetails: false
    }
  }

  toggleDetails() {
    this.setState({showDetails: !this.state.showDetails});
  }

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
      .done((event) => {
        console.log('Successfully added event: ', event)
        let newEvent = {
          card_id: self.props.id,
          summary: event.summary,
          event_id: event.id,
          start: event.start,
          end: event.end,
          htmlLink: event.htmlLink
        }

        self.props.addEventToCard(newEvent);

      })
      .fail((err) => console.log.bind(console))
  }

  deleteEvent(event_id){
    let card_id = this.props.id;
    let eventIndex = this.props.events.findIndex((e) => e.event_id === event_id);
    Utils.deleteGCalEvent({
      event_id,
      card_id
    })
    .done(() => {
      console.log("Successfully deleted event from card.");
      this.props.deleteEventFromCard(this.props.events[eventIndex]);
    })
    .fail((error) => console.log("Error while deleting event from card: ", error));
  }

  render() {
    let eventsList = "No events scheduled";
    if ( this.state.showDetails && !this.props.isDragging && this.props.events && this.props.events.length > 0) {
      eventsList = this.props.events.map((event, i) => {
        return (
          <div key={displayEvent.id}>
            <span>{displayEvent.summary}: </span>
            <span>{Moment(displayEvent.start).calendar()}</span>
            <RemoveButton removeTarget={event.event_id} removeAction={this.deleteEvent.bind(this)} />
          </div>
        );
      });
    } 

    let widgets = this.state.showDetails ? 
      (
        <div>
          <div className="card_details" dangerouslySetInnerHTML={{__html: this.props.snippet}}></div>
          <hr />
          {eventsList}
          <DateTimePicker onChange={this.getStartDateTime.bind(this)} defaultValue={new Date()} placeholder='Enter start date/time' />
          <button className="bigassbutton" type="button" onClick={this.saveEvent.bind(this)}>{'Save Event'}</button>
          <input type='text' ref="eventInput" placeholder="enter event description.." />
          <hr />
          <NotesList updateCardNotes={this.props.updateCardNotes} notes={this.props.notes} card_id={this.props.id}/> 
        </div>
      ) : null;

    const { connectDragSource, connectDropTarget, isDragging } = this.props;

    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: "red"
    }

    let isDraggingOverlay = <div className="is__dragging__overlay" />;

    return connectDropTarget(connectDragSource(
      <div className="card">
        { isDragging ? isDraggingOverlay : <div style={sideColor} /> }
        <RemoveCard card_id={this.props.id} deleteCardFromKanban={this.props.deleteCardFromKanban} />
        <div className={this.state.showDetails? "card__title card__title--is-open" : "card__title"} 
             onClick={this.toggleDetails.bind(this)}>
          {this.props.company ? `${this.props.company}` : null }        
          <span className="position__name">{this.props.title}</span>
          <Rating start={0} 
                  stop={5} 
                  step={1} 
                  initialRate={this.props.rating}
                  empty="fa fa-star-o"
                  full="fa fa-star" />
        </div>

        <ReactCSSTransitionGroup transitionName="toggle"
                                 transitionEnterTimeout={250}
                                 transitionLeaveTimeout={250} >
          { widgets }
        </ReactCSSTransitionGroup>
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
