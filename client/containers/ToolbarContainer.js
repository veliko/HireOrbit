import React, { Component, PropTypes } from 'react';
import Toolbar from '../components/Toolbar';
import { connect } from 'react-redux';
import { updateFilterValue } from '../actions';

class ToolbarContainer extends Component {
  render() {
    return (
      <Toolbar {...this.props}/>
    );
  }
}

function mapDispatchToProps(state) {
  return {
    filterValue: state.filter
  }
}

export default connect(mapDispatchToProps, { updateFilterValue })(ToolbarContainer);