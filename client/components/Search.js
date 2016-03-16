import React from 'react';


class Search extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchVal: 'software engineer'
    }
  }

  handleSearch(e){
    console.log(e.target.value);
    this.setState({searchVal: e.target.value})
  }

  render(){
    // overlay with advanced options
    const AdvancedSearch = () => 
      <input type='button' value='Advanced Search'></input>

    return (
      <div>
        <input name='search' type='text' value={this.state.searchVal} 
        className='search-bar' placeholder='Search for jobs' onChange={this.handleSearch.bind(this)} />
        <AdvancedSearch />
      </div>
      )
  }
}

export default Search;
