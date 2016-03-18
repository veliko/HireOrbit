import React from 'react';

const JobsList = (props) => {
  console.log(props);

  return (
    <div className="jobs">
      {props.jobs.map(job =>
        <div className="job" key={job.jobkey}>
          <h2>{job.jobtitle}</h2>
          <div className="description" dangerouslySetInnerHTML={{__html: job.snippet}}></div>
        </div>)}
    </div>
  )
}

export default JobsList;
