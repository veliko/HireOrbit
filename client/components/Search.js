import React from 'react';
import Utils from '../utils/Utils';
import Auth from '../utils/Auth';
import JobsList from './JobsList';

class Search extends React.Component {
  constructor(props){
    super(props);
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

  render(){
    var Facet = (props) => (
      <aside>
        <div>
          <h3>Position</h3>
          <input type="text" value="" placeholder="Position" />
        </div>
        <div>
          <h3>Location</h3>
          <input type="text" value="" placeholder="Location" />
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
