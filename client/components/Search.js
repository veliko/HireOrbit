import React from 'react';
import Utils from '../utils/Utils';
import Auth from '../utils/Auth';
import JobsList from './JobsList';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

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
      sort: '',
      start: 0,
      q: {},
      allSavedSearches: [],
      searchName:""
    };
  }

  componentDidMount() {
    let { query } = this.props.location;
    let { q, l, limit, radius, jt, st, start } = query;
    let self = this;

    Utils.getJobsFromIndeed(query, (res) => {
      self.props.updateCurrentSearch(res);
    }, console.log.bind(console));

    Utils.getAllSearches()
      .then((searches => {
        this.setState({
          allSavedSearches: searches
        })
      }));

    this.setState({
      jobSet: [{label: 'Any', value: ''}, {label: 'Fulltime', value: 'fulltime'}, {label: 'Part Time', value: 'parttime'}, {label: 'Contract', value: 'contract'}, {label: 'Internship', value: 'internship'}, {label: 'Temporary', value: 'temporary'}],
      employerSet: [{label: 'Any', value: ''}, {label: 'Recruiter', value: 'recruiter'}, {label: 'Employer', value: 'employer'}],
      employerType: st,
      jobType: jt,
      location: l,
      position: q,
      radius: radius,
      start: start,
      sort: 'relevance',
      searchName:"",
    });
  }

  saveCurrentSearch(){
    var prevState = this.props.currentSearch;
    var self = this;
    var searchObj = {
      name: self.state.searchName,
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

  updateText(event) {
    let key = event.target.name;
    this.setState({
      [key]: event.target.value
    });
  }

  updateState(event) {
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

  fetchSavedSearch(id){
    self = this;
    Utils.getSavedSearch(id)
    .done(search => {
      console.log(search);
      self.props.updateCurrentSearch({results: search})
    })
    .fail(console.log);
  }
  
  render(){
    var Pagination = (props) => (
      <div className="pagination">
        <button name="start" value={ (this.state.start <= 0) ? 0 : this.state.start - 25 } onClick={ this.updateState.bind(this) }>Prev</button>
        <button name="start" value={ (Number(this.state.start) + 25) } onClick={ this.updateState.bind(this) }>Next</button>
      </div>
    );

    var Sort = (props) => (
      <div className="sort">
        <select onChange={ this.updateState.bind(this) } name="sort" value={ this.state.sort }>
          <option value="relevance" name="sort">Relevance</option>
          <option value="date" name="sort">Date</option>
        </select>
      </div>
    );

    var Types = (props) => (
      <div className="types">
        <h3>{props.title}</h3>
        {props.types.map((item, i) =>
          // make this active based on the 'checked' match
          <div key={i} className={ (item.value === this.state[props.name]) ? 'active' : '' }>
            <span>{item.label}</span>
            <input type="radio" name={props.name} value={item.value} checked={item.value === this.state[props.name]} onChange={ this.updateState.bind(this) } />
          </div>
        )}
      </div>
    );

    var SavedSearches = (props) => (
      <aside className="saved-search">
        <div>
          <h4>Saved Searches</h4>
          <ul>
          {this.state.allSavedSearches.map(saved => (
            <li onClick={this.fetchSavedSearch.bind(this, saved.internal_id)}>{saved.name}</li>
          ))}
          </ul>
        </div>
        <div>
          <input type='text' value={this.state.searchName} name="searchName" onChange={this.updateText.bind(this)} placeholder='Save this search'/>
          <button onClick={ this.saveCurrentSearch.bind(this) }>Save</button>
        </div>
      </aside>
    );

    return (
      <div className="flex">
        <div className="search-results">
          <aside>
            <div className="sticky">
              <h2>Refine Results</h2>
              <div>
                <h3>Position</h3>
                <div className="flex">
                  <input type="text" placeholder="Position" name="position" value={this.state.position} onChange={ this.updateText.bind(this) } />
                  <button onClick={this.updateSearch.bind(this)}>Update</button>
                </div>
              </div>
              <div>
                <h3>Location</h3>
                <div className="flex">
                  <input type="text" placeholder="Location" name="location" value={this.state.location} onChange={ this.updateText.bind(this) } />            
                  <button onClick={this.updateSearch.bind(this)}>Update</button>
                </div>
              </div>
              <div>
                <h3>Radius</h3>
                <input type="range" name="range" min="0" max="100" step="25" value={this.state.range} onDragExit={ this.updateState.bind(this) } />
                <div className="range">
                  <span>0<br/>miles</span>
                  <span>50</span>          
                  <span>100<br/>miles</span>
                </div>
              </div>
              <Types types={this.state.jobSet} name={"jobType"} title={"Job Type"} />
              <Types types={this.state.employerSet} name={"employerType"} title={"Post Type"} />
            </div>
          </aside>
          <div className="jobs">
            <Sort />
            <JobsList addCardsToKanban={this.props.addCardsToKanban} cardPositions={this.props.cardPositions} jobs={this.props.currentSearch.results} />
            <Pagination />
          </div>
        </div>
        { Auth.isLoggedIn() ? <SavedSearches /> : null }
      </div>  
    )
  }
}

export default Search;