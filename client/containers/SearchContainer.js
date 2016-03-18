import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateCurrentSearch } from '../actions';
import Search from '../components/Search';

class SearchContainer extends Component {
  constructor(){
    super();
  }

  render(){
    console.log("Search Container Props: ", this.props);
    return (
      <Search {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSearch: state.currentSearch
  }
}

export default connect( mapStateToProps, { updateCurrentSearch } )(SearchContainer);