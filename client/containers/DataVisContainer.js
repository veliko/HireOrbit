import React, { Component } from 'react';
import { connect } from 'react-redux';
import dataVisual from '../reducers/index';
import d3 from 'd3';

const styles = {
  width   : 500,
  height  : 300,
  padding : 20,
};

var dataset = [
    [ 5,     20 ],
    [ 480,   90 ],
    [ 250,   50 ],
    [ 100,   33 ],
    [ 330,   95 ],
    [ 410,   12 ],
    [ 475,   44 ],
    [ 25,    67 ],
    [ 85,    21 ],
    [ 220,   88 ],
    [600,    150]
];

const renderCircles = (props) => {bb
    const circleProps = {
      cx: 100,
      cy: 100,
      r: 50,
      fill: "#ffff00"
    };
    console.log('inside render circle', props)
    return <circle {...circleProps} />;
  };

class DataVisContainer extends Component {
  // <g>{renderCircles(props)}</g>

  renderList (search) {
    const location = search.location;
    const totalResults = search.totalResults;
    const query = search.query;
    return (
      <li key={query}>
          `{location}, {totalResults}, {query}`
      </li>
    )
  }

  render () {
    return (
      <ul>
            {this.props.dataVisual.map(this.renderList)}
      </ul>
    )
  }
}

function mapStateToProps({dataVisual}) {
  return {dataVisual};
}

export default connect(mapStateToProps)(DataVisContainer)
