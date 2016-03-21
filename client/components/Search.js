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
      Utils.getJobsFromIndeed({q:query}, 
        (res) => {
          console.log("received indeed results: ", res);
          self.props.updateCurrentSearch(res);
        },
        console.log.bind(console));
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

  componentDidMount(){
    var self = this;
    self.getSearchJobs();
    if (Auth.isLoggedIn()) {
      Utils.getAllSearches()
        .done(results => {
          self.props.fetchSavedSearches(results);
        })
        .fail(error => {
          console.log('Error fetching saved searches: ', error);
        });
    }
  }

  render(){
    return (  
      <div>
        <div className="search-box">
          <input name='search' 
                 ref='searchQuery' 
                 type='text'
                 className='search-bar' 
                 placeholder='Search for jobs' />

          <button onClick={this.getSearchJobs.bind(this)}>Search</button>
          <button>Advanced Search</button>
          <br/>
          <input ref='searchName' 
                 type='text' 
                 placeholder='Enter name to save search'
                 className='search-bar' />
        </div>
          <button onClick={this.saveCurrentSearch.bind(this)}>Save Search</button>

        <div className="results">
          <JobsList addCardsToKanban={this.props.addCardsToKanban}
                    cardPositions={this.props.cardPositions} 
                    jobs={this.props.currentSearch.results} />
        </div>
      </div>
    )
  }
}

export default Search;
