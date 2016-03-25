import React, { Component } from 'react';
import { connect } from 'react-redux';
import dataVisual from '../reducers/index';
import d3 from 'd3';

const styles = {
  width   : 500,
  height  : 300,
  padding : 20,
};

const spec = {
  width: 600,
  height: 300,
  border: "1px solid #ffff00",
  display: "block",
  margin: "0 auto"
}

const h1 = {
  color: "white"
}

  let xMax = (data)  => d3.max(data, (d) => d);
  let yMax = (data)  => d3.max(data, (d) => d);

  let xScale = (props) => {
    return d3.scale.linear()
            .domain( [ 0, xMax(props[0]) ])
            .range([0, yMax(props[1])])
  }
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


const renderCircles = (props) => {
    let x = (Math.random() * .2) * props
    let y = (Math.random() * .2) * props;
    console.log('from the render circle', x, y);
    const circleProps = {
      cx: x,
      cy: y,
      r: 20,
      fill: "#ffff00"
    };
    return <circle {...circleProps} />;
  };

class DataVisContainer extends Component {

  constructor(props) {
    super(props)
  }

  renderList (data) {
    const location = data.location;
    const totalResults = data.totalResults;
    const query = data.query;
    console.log(query, location, totalResults);
    // <svg style={spec}>
    //       {this.props.dataVisual.map(this.renderList)}
    // </svg>
    // return renderCircles(totalResults);
    return <li>`{query} lives in the city of {location}. {query} Weighs a ton. {query} weighs a grand total of {totalResults} lbs. `</li>
  }

  render () {
    return (
      <ul style={h1}>  { this.props.dataVisual.map(this.renderList) } </ul>
    )
  }
}




function mapStateToProps({dataVisual}) {
  return {dataVisual};
}

export default connect(mapStateToProps, null)(DataVisContainer)
