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
    this.state = {
      expanded: 1
    }
  }

  handleCompressExpandButtonClick() {
    this.setState({
      expanded: this.state.expanded * -1
    });
    this.props.updateNumberOfExpandedLists(this.state.expanded * -1);
  }

  render() {
    const { connectDropTarget } = this.props;
    let list;
    let cards = this.props.cards.map((card) => {
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

    if (this.state.expanded === 1) {
      list = connectDropTarget(
               <div className="list" style={{width: `calc( (100% - ((4 - ${this.props.numberOfExpandedLists}) * 60px)) / ${this.props.numberOfExpandedLists} )`}}>
                 <h1 className="list__heading__expanded">
                   {this.props.title + " "} 
                   <span className="card-count">{this.props.cards ? this.props.cards.length : 0}</span>
                   <span className="fa fa-compress list"
                         onClick={this.handleCompressExpandButtonClick.bind(this)}></span>
                 </h1>
                 {this.props.cards.length === 0 ? <h1 className="column__instruction title">{this.props.title}</h1> : null}
                 {this.props.cards.length === 0 ? <h1 className="column__instruction">{this.props.description}</h1> : null}
                 {cards}
               </div>
             );
    } else if (this.state.expanded === -1) {
      list = (
               <div className="list" style={{width: "60px", backgroundColor: "#dcdcdc", padding: "0", textAlign: "left"}}>
                 <span className="fa fa-expand list compressed"
                       onClick={this.handleCompressExpandButtonClick.bind(this)}></span>
                 <h1 className="list__heading__compressed">
                   <span className="card-count compressed">{this.props.cards ? this.props.cards.length : 0}</span> {" " + this.props.title + " "}
                 </h1>
               </div>
             );
    }

    return list;
  }
}

List.propTypes = {
  id: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(dragTypes.CARD, listTargetSpec, collect)(List);