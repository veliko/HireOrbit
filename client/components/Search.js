import React from 'react';
import Utils from '../utils/Utils';
import Auth from '../utils/Auth';
import JobsList from './JobsList';

class Search extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      jobSet: [],
      employerSet: [],
      employerType: '',
      jobType: '',
      location: '',
      position: '',
      range: 0,
      q: {}
    };
  }

  componentDidMount() {
    this.setState({
      jobSet: [{label: 'Any', value: ''}, {label: 'Fulltime', value: 'fulltime'}, {label: 'Part Time', value: 'parttime'}, {label: 'Contract', value: 'contract'}, {label: 'Internship', value: 'internship'}, {label: 'Temporary', value: 'temporary'}],
      employerSet: [{label: 'Any', value: ''}, {label: 'Recruiter', value: 'recruiter'}, {label: 'Employer', value: 'employer'}],
      employerType: '',
      jobType: '',
      location: 'San Francisco, CA',
      position: 'Software Engineer',
      range: 25
    });
  }

  stateChange(event) {
    let key = event.target.name;
    this.setState({
      [key]: event.target.value
    });
  }

  getSearchJobs(){
    let query = this.refs.searchQuery.value || 'software engineer';
    let self = this;
    Utils.getJobsFromIndeed({ q: query }, (res) => {
      self.props.updateCurrentSearch(res);
    }, console.log.bind(console));
  }

  saveCurrentSearch(){
    var prevState = this.props.currentSearch;
    var self = this;
    var searchObj = {
      name: self.refs.searchName.value,
      jobs: self.props.currentSearch.results
    }
    // update savedSearches redux state
    // console.log('searchObj: ', searchObj);
    // send post request to the server ro save
    Utils.saveSearch(searchObj);
  }

  componentDidMount() {
    let { query } = this.props.location;
    let self = this;
      Utils.getJobsFromIndeed(query, 
        (res) => {
          self.props.updateCurrentSearch(res);
          // self.props.history.push('/q');
        },
        console.log.bind(console));
  }

  render(){
    var Facet = (props) => (
      <aside>
        <div className="sticky">
          <h2>Refine Results</h2>
          <div>
            <h3>Position</h3>
            <input type="text" value="" placeholder="Position" />
          </div>
          <div>
            <h3>Location</h3>
            <input type="text" value="" placeholder="Location" />
          </div>
          <div>
            <h3>Radius</h3>
            <input type="range" min="0" max="100" step="25" />
            <div className="range">
              <span>0<br/>miles</span>
              <span>50</span>          
              <span>100<br/>miles</span>
            </div>
          </div>
          <div className="job-type type">
            <h3>Job Type</h3>
            <div>
              <a href="#" >Any</a><span> (23)</span>
            </div>
            <div>
              <a href="#">Full Time</a><span> (23)</span>
            </div>
            <div>
               <a href="#">Contract</a><span> (23)</span>
            </div>
            <div>
              <a href="#">Part Time</a><span> (23)</span>
            </div>
            <div>
              <a href="#">Internship</a><span> (23)</span>        
            </div>
            <div>
              <a href="#">Temporary</a><span> (23)</span>        
            </div>
          </div>
          <div className="employer-type type">
            <h3>Employer Type</h3>
            <div>
              <a href="#">Any</a><span> (23)</span>
            </div>
            <div>
              <a href="#">Recruiter</a><span> (23)</span>
            </div>
            <div>
               <a href="#">Employer</a><span> (23)</span>
            </div>
          </div>
        </div>
      </aside>
    );

    return (  
      <div className="search-results">
        <Facet />
        <JobsList addCardsToKanban={this.props.addCardsToKanban} cardPositions={this.props.cardPositions} jobs={this.props.currentSearch.results} />
      </div>
    )
  }
}

export default Search;
