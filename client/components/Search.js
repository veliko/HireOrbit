import React from 'react';
import Utils from '../utils/Utils';
import Auth from '../utils/Auth';
import JobsList from './JobsList';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'

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
      radius: 0,
      sort: 'relevance',
      start: 0,
      q: {}
    };
  }

  componentDidMount() {
    let { query } = this.props.location;
    let { q, l, limit, radius, jt, st, start } = query;

    let self = this;
    Utils.getJobsFromIndeed(query, (res) => {
      self.props.updateCurrentSearch(res);
    }, console.log.bind(console));

    this.setState({
      jobSet: [{label: 'Any', value: ''}, {label: 'Fulltime', value: 'fulltime'}, {label: 'Part Time', value: 'parttime'}, {label: 'Contract', value: 'contract'}, {label: 'Internship', value: 'internship'}, {label: 'Temporary', value: 'temporary'}],
      employerSet: [{label: 'Any', value: ''}, {label: 'Recruiter', value: 'recruiter'}, {label: 'Employer', value: 'employer'}],
      employerType: st,
      jobType: jt,
      location: l,
      position: q,
      radius: radius,
      start: start,
      sort: 'relevance'
    });
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

  updateSearch() {
    var q = {
      q: this.state.position,
      l: this.state.location,
      radius: this.state.range,
      jt: this.state.jobType,
      st: this.state.employerType,
      sort: this.state.sort,
      start: this.state.start
    }

    let self = this;
    Utils.getJobsFromIndeed(q, (res) => {
      self.props.updateCurrentSearch(res);
    }, console.log.bind(console));

    browserHistory.push({
      pathname: '/search',
      query: q
    });
  }

  stateChange(event) {
    let key = event.target.name;
    this.setState({
      [key]: event.target.value
    });
  }

  selectChange(event) {
    let key = event.target.name;
    this.setState({
      [key]: event.target.value
    });

    var q = {
      q: this.state.position,
      l: this.state.location,
      radius: this.state.range,
      jt: this.state.jobType,
      st: this.state.employerType,
      sort: this.state.sort,
      start: this.state.start
    }

    let self = this;
    Utils.getJobsFromIndeed(q, (res) => {
      self.props.updateCurrentSearch(res);
    }, console.log.bind(console));

    browserHistory.push({
      pathname: '/search',
      query: q
    });
  }

  render(){
    // Pagination can use TO and FROM attr
    var Pagination = (props) => (
      <div className="pagination">
        {[...Array(10)].map((x, i) =>
          <button key={i + 1} name="start" value={i * 25} onClick={this.selectChange.bind(this)}>{i + 1}</button>
        )}
      </div>
    );
    var Sort = (props) => (
      <div className="sort">
        <select onChange={this.selectChange.bind(this)} name="sort">
          <option value="relevance">Relevance</option>
          <option value="date">Date</option>
        </select>
      </div>
    );
    return (  
      <div className="search-results">
        <aside>
          <div className="sticky">
            <h2>Refine Results</h2>
            <div>
              <h3>Position</h3>
              <div className="flex">
                <input type="text" placeholder="Position" name="position" value={this.state.position} onChange={ this.stateChange.bind(this) } />
                <button onClick={this.updateSearch.bind(this)}>Update</button>
              </div>
            </div>
            <div>
              <h3>Location</h3>
              <div className="flex">
                <input type="text" placeholder="Location" name="location" value={this.state.location} onChange={ this.stateChange.bind(this) } />            
                <button onClick={this.updateSearch.bind(this)}>Update</button>
              </div>
            </div>
            <div>
              <h3>Radius</h3>
              <input type="range" name="range" min="0" max="100" step="25" value={this.state.range} onDragExit={ this.selectChange.bind(this) } />
              <div className="range">
                <span>0<br/>miles</span>
                <span>50</span>          
                <span>100<br/>miles</span>
              </div>
            </div>
            <div className="job-type type">
              <h3>Job Type</h3>
              <div>
                <a href="#" >Any</a>
              </div>
              <div>
                <a href="#">Full Time</a>
              </div>
              <div>
                 <a href="#">Contract</a>
              </div>
              <div>
                <a href="#">Part Time</a>
              </div>
              <div>
                <a href="#">Internship</a>       
              </div>
              <div>
                <a href="#">Temporary</a>       
              </div>
            </div>
            <div className="employer-type type">
              <h3>Employer Type</h3>
              <div>
                <a href="#">Any</a>
              </div>
              <div>
                <a href="#">Recruiter</a>
              </div>
              <div>
                 <a href="#">Employer</a>
              </div>
            </div>
          </div>
        </aside>
        <div className="jobs">
          <Sort />
          <JobsList addCardsToKanban={this.props.addCardsToKanban} cardPositions={this.props.cardPositions} jobs={this.props.currentSearch.results} />
          <Pagination />
        </div>
      </div>
    )
  }
}

export default Search;
