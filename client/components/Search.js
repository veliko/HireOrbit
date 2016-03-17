import React from 'react';
import Utils from '../utils/Utils';
import JobsList from './JobsList';

class Search extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchVal: 'software engineer',
      jobs: []
    }
  }

  handleSearch(e){
    console.log(e.target.value);
    this.setState({searchVal: e.target.value});
    if (e.charCode === 13 || e.keyCode === 13){
      console.log('In search on input enter')
      this.getSearchJobs(this.state.searchVal).bind(this)
    }
  }

  getSearchJobs(query){
    query = query || this.state.searchVal;
    Utils.getJobsFromIndeed({q:query},
      function (res) {
        console.log('inside jobs setState');
        this.setState({jobs: res.results});
        console.log(this.state)
       }.bind(this),
      console.log.bind(console));
  }

  componentDidMount(){
    this.getSearchJobs('software engineer');
  }

  render(){
    // overlay with advanced options

    return (
      <div>
        <div className="search-box">
          <input name='search' type='text' value={this.state.searchVal}
          className='search-bar' placeholder='Search for jobs' onChange={this.handleSearch.bind(this)} onKeyUp={this.handleSearch.bind(this)} />

          <button>Search</button>
          <button>Advanced Search</button>

        </div>

        <div className="results">
          <JobsList jobs={this.state.jobs}/>
        </div>
      </div>
    )
  }
}

export default Search;
