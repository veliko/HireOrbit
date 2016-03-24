import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataVis from '../components/DataVis';
import { fetchDataVis } from '../actions';
import dataVisual from '../reducers/index'

console.log('I am here in the dataviscontainer', actions.fetchDataVis)

class DataViz extends Component {
  render () {
    return (
      <div>
        <h1>Hey there you made it to the DATA VIZ STORE WELCOME</h1>
        <DataVis />
      </div>
    )
  };
};

function mapToDispatchProps(dispatch) {
  return bindActionCreators({ fetchDataVis: fetchDataVis }, dispatch);
};

function mapStateToProps({dataVisual}) {
  return {dataVisual};
}

export default connect (mapStateToProps, mapToDispatchProps)(DataViz)
