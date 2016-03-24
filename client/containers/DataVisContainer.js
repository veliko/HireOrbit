import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataVis from '../components/DataVis';
import { fetchDataVis } from '../actions';
import dataVisual from '../reducers/index'


class DataVisContainer extends Component {

  renderList (data) {
    const cities = data.city;
    const datas = data.data;
    const libraries = data.libraries;
    return <DataVis key={cities} data={datas} library={libraries} city={cities} />
  }

  render () {
    return (
      <div>
        {this.props.dataVisual.map(this.renderList)}
      </div>
    );
  };
};

function mapToDispatchProps(dispatch) {
  console.log('mapToDispatchProps', fetchDataVis)
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
