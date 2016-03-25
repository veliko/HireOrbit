import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataVis from '../components/DataVis';
import { fetchDataVis } from '../actions';
import dataVisual from '../reducers/index';
import d3 from 'd3';

const spec = {
  width: 800,
  height: 500,
  border: "1px solid #ffff00",
  display: "block",
  margin: "0 auto"
}

  let xMax   = (data)  => d3.max(data, (d) => d);
  let yMax   = (data)  => d3.max(data, (d) => d);

  let xScale = (props) => {
    return d3.scale.linear()
            .domain( [ 0, xMax(props[0]) ])
            .range([0, yMax(props[1])])
  }\
  let yScale = (props) => {
    return d3.scale.linear()
            .domain([0, xMax(props[0])])
            .range([0, yMax(props[1])])
  }
  let rScale = (props) => {
    return d3.scale.linear()
            .domain([0, xMax(props[1])])
            .range([10 , 100])
  }
  let marshalScale = (props) => {
    const scales = {
      xScale: xScale(props),
      yScale: yScale(props),
      rScale: rScale(props)
    };
    return Object.assign({}, props, scales);
  }

  class DataVisContainer extends Component {

      dataVisComponentRender (data) {
        const cities = data.city;
        const datas = data.data;
        const libraries = data.libraries;
        const d3Props = marshalScale(datas)
        console.log('inside DataVisContainer', d3Props[0])
        return <DataVis
          key={cities}
          data={datas}
          library={libraries}
          city={cities}
          scale={d3Props}
          />
      }

    render () {
      return (
        <svg style={spec}>
          <g>{this.props.dataVisual.map(this.dataVisComponentRender)}</g>
        </svg>
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
