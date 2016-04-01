import React, { Component, Proptypes } from 'react';
import Utils from '../utils/Utils';

class JobsList extends Component {
  constuctor(){
    this.addJobToKanban = this.addJobToKanban.bind(this);
  }

  addJobToKanban(job) {
    job.isInKanban = true;
    
    let card = [
      {
        card_id: job.jobkey,
        job_data: job,
        events: [],
        rating: 0,
        status: 'interested',
      }
    ];

    this.props.addCardsToKanban(card);

    let cardPositions = this.props.cardPositions;
    let cardIsInKanban = Boolean(cardPositions[job.jobkey] !== undefined);
    console.log("card positions before adding to kanban: ", cardPositions);
    console.log("card is in kanban: ", cardIsInKanban);

    if (!cardIsInKanban) {
      cardPositions[job.jobkey] = Object.keys(this.props.cardPositions).length;
      console.log("card positions before stringifying: ", cardPositions);
      cardPositions = JSON.stringify(cardPositions);

      let cardsAndPositions = {
        cards: card,
        cardPositions
      }
      
      console.log("card data to be persisted: ", cardsAndPositions);
      Utils.persistCardsToKanban(cardsAndPositions);
    } else {
      console.log("card is already in Kanban");
    }
  }

  render(){
    return (
      <div>
        {this.props.jobs.map(job =>
          <div className={job.isInKanban ? "job saved-job" : "job"} key={job.jobkey}>
            <div>
              <h2><a href={job.url} target="_blank">{job.company}</a></h2>
              <h3><a href={job.url} target="_blank">{job.jobtitle}</a></h3>
              <div>
                <h3>{job.formattedlocation+", "}</h3>
                <small>{job.formattedrelativetime}</small>
              </div>
              <hr />
              { job.expired ?  "Expired" : "" }
              <div className="description" dangerouslySetInnerHTML={{__html: job.snippet}}></div>
              <div>
                {job.isInKanban ? <button disabled><i className="fa fa-check"></i> Added to Kanban</button> : <button onClick={() => this.addJobToKanban(job)}><i className="fa fa-table"></i> Add to Kanban</button>} 
                <button><a href={job.url} target="_blank"><i className="fa fa-check"></i> Apply on Indeed</a></button>
              </div>
            </div>
            <div className="strip"></div>
          </div>
        )}
      </div>
    )
  }
}

export default JobsList;
