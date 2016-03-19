import React, { Component, Proptypes } from 'react';

class JobsList extends Component {
  constuctor(){
    this.addJobToKanban = this.addJobToKanban.bind(this);
  }

  addJobToKanban(job) {
    var card = [
      {
        card_id: job.jobkey,
        job_data: job,
        status: 'interested',
        notes: []
      }
    ];
    console.log("job details to be added:", card);
    this.props.addCardsToKanban(card);
  }

  render(){
    return (
      <div className="jobs">
        {this.props.jobs.map(job =>
          <div className="job" key={job.jobkey}>
            <h2>{job.jobtitle}</h2>
            <div className="description" dangerouslySetInnerHTML={{__html: job.snippet}}></div>
            <button onClick={() => this.addJobToKanban(job)}>Add to Kanban</button>
          </div>)}
      </div>
    )
  }
}

export default JobsList;
