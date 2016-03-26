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
import lodash from 'lodash';
// import { Link } from 'react-router';

import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import numberLocalizer from 'react-widgets/lib/localizers/simple-number'

// Localizers for Datepicker
numberLocalizer();
momentLocalizer(Moment);

var throttledHoverHandler = lodash.throttle((props, monitor) => {
  if (monitor && props && monitor.getItem() && monitor.getItem().id && props.id) {
    let hoverCardId = monitor.getItem().id;
    let cardBelowId = props.id;
    if (hoverCardId !== cardBelowId){
      props.updateCardPosition(hoverCardId, cardBelowId);
    }
  }
}, 200); 

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
    throttledHoverHandler(props, monitor);
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

  changeRating(newRating) {
    console.log("New Rating: ", newRating);
    this.props.changeCardRating(this.props.id, newRating);
  }

  getStartDateTime(date, dateStr) {
    this.startDate = Moment(date).toISOString();
  }

  getEndDateTime() {
    return Moment(this.startDate).add(10, 'minutes').toISOString();
  }

  saveEvent(e){
    if (e.key === "Enter") {
      let self = this;
      let summary = self.refs.eventInput.value;
      if (summary === "") {
        console.log("summary: ", summary);
        // e.taget.value = "Please enter event description";
        // setTimeout(() => {
        //   e.target.value = "";
        // }, 2000);
        return;
      }
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
          self.refs.eventInput.value = "";
        })
        .fail((err) => console.log.bind(console))
    }
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
    let eventsList = <span className="card__list__entry">"No events scheduled"</span>;
    if ( this.state.showDetails && !this.props.isDragging && this.props.events && this.props.events.length > 0) {
      eventsList = this.props.events.map((event, i) => {
        return (
          <div className="card__list__entry" key={i}>
            <RemoveButton removeTarget={event.event_id} removeAction={this.deleteEvent.bind(this)} />
            <span>{event.start ? (Moment(event.start.dateTime).format("MM/Do, h:mma") + ": ") : "no start time"}</span>
            <span>{event.summary ? event.summary : "no event summary"}</span>
          </div>
        );
      });
    } 

    let widgets = this.state.showDetails ? 
      (
        <div className="events__list">
          <div className="card_details" dangerouslySetInnerHTML={{__html: this.props.snippet}}></div>
          <br />
          <div className="fa fa-calendar-check-o">{"  Events"}</div>
          {eventsList}
          <div className="date__time__picker">
            <DateTimePicker onChange={this.getStartDateTime.bind(this)} defaultValue={new Date()} placeholder='Enter start date/time' />
          </div>
          <input type='text' 
                 className="card__input"
                 ref="eventInput" 
                 placeholder="enter event description.." 
                 onKeyPress={this.saveEvent.bind(this)}/>
          <br />
          <div className="fa fa-sticky-note-o">{"  Notes"}</div>
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
      width: 5,
      backgroundColor: "#00CED1"
    }

    let isDraggingOverlay = <div className="is__dragging__overlay" />;

    return connectDropTarget(connectDragSource(
      <div className="card">
        { isDragging ? isDraggingOverlay : <div style={sideColor} /> }
        <RemoveCard card_id={this.props.id} deleteCardFromKanban={this.props.deleteCardFromKanban} />
        <div className={this.state.showDetails? "card__title card__title--is-open" : "card__title"} 
             onClick={this.toggleDetails.bind(this)}>
          {this.props.company ? `${this.props.company}` : null }        
        </div>
        <span className="position__name">{this.props.title}</span>
        <Rating start={0} 
                stop={5} 
                step={1} 
                initialRate={this.props.rating}
                empty="fa fa-star-o"
                full="fa fa-star" 
                onChange={this.changeRating.bind(this)}/>
        <button className="view__job__posting">
          <a className="job__posting__link" href={`${this.props.jobLink}`} target="_blank">View Job Posting</a>
        </button>
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
