import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataVis from '../components/DataVis';
import { fetchDataVis } from '../actions';
import dataVisual from '../reducers/index'


class DataVisContainer extends Component {

  renderList () {
    return this.props.fetchDataVis("HEY THERE");
  }

  render () {
    return (
      <div>
        <DataVis />
      </div>
    );
  };
};

function mapToDispatchProps(dispatch) {
  console.log('mapProps in DataVisContainer container', fetchDataVis)
  return bindActionCreators({ fetchDataVis: fetchDataVis }, dispatch);
};

function mapStateToProps({dataVisual}) {
  console.log('mapStateToProps in DataVisContainer container', {dataVisual});
  return {dataVisual};
};

// DataVisContainer.propTypes = {
//   fetchDataVis: PropTypes.func.isRequired
// }

export default connect (mapStateToProps, mapToDispatchProps)(DataVisContainer)
