import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MonsterJobs from '../components/MonsterJobs';

class MonsterJobsContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MonsterJobs {...this.props}/>
    );
  }  
}

function mapStateToProps(state) {
  return {
    query: state.currentQuery
  }
} 

export default connect(mapStateToProps, null)(MonsterJobsContainer); 