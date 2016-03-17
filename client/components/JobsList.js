import React from 'react';


const JobsList = (props) => {
  console.log(props);

  return (<ul>
            {props.jobs.map(job => <li key={job.id}> {job.jobtitle} <br/> 
                                    <div dangerouslySetInnerHTML={{__html: job.snippet}}></div><br/></li>)}
          </ul>)
}

export default JobsList;