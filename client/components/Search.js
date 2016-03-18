import React from 'react';
import Utils from '../utils/Utils';
import JobsList from './JobsList';

class Search extends React.Component {
  constructor(props){
    super(props);
  }

  getSearchJobs(){
    let query = this.refs.searchQuery.value || 'software engineer';
    let self = this;
    Utils.getJobsFromIndeed({q:query}, 
      (res) => {
        console.log('action dispatcher:',  res);
        self.props.updateCurrentSearch(res);
      },
      console.log.bind(console));
  }

  componentDidMount(){
    this.getSearchJobs();
  }

  render(){
    // overlay with advanced options
    console.log('this.props...........', this.props);
    return (
      <div>
        <div className="search-box">
          <input name='search' ref='searchQuery' type='text'
          className='search-bar' placeholder='Search for jobs' />

          <button onClick={this.getSearchJobs.bind(this)}>Search</button>
          <button>Advanced Search</button>
          <button>Save Search</button>
        </div>

        <div className="results">
          <JobsList jobs={this.props.currentSearch.results}/>
        </div>
      </div>
    )
  }
}

export default Search;
