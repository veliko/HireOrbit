import React, { Component, PropTypes } from 'react';
import Toolbar from '../components/Toolbar';
import { connect } from 'react-redux';
import { updateFilterValue, changeSortingCriteria } from '../actions';

class ToolbarContainer extends Component {
  render() {
    return (
      <Toolbar {...this.props}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    filterValue: state.filter,
    sortBy: state.sortingCriteria
  }
}

export default connect(mapStateToProps, { updateFilterValue, changeSortingCriteria })(ToolbarContainer);
