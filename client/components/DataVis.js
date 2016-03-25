import React from 'react';
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

//
// var scale = d3.scale.linear()
// 							.domain([100, 500])
//               .range([10, 350]);
//
// var xScale = d3.scale.linear()
//                      .domain([0, d3.max(dataset, function(d) 																				{ return d[0]; })])
//                      .range([padding, w - padding]);
// var yScale = d3.scale.linear()
//                      .domain([0, d3.max(dataset, function(d) 																				{ return d[1]; })])
//                      .range([h - padding, padding]);
//
// var rScale = d3.scale.linear()
//                      .domain([0, d3.max(dataset, function(d) 																	  		{ return d[1]; })])
//                      .range([2, 5]);
//
//
// var xAxis = d3.svg.axis()
// 							.scale(xScale)
//               .orient('bottom');
//
//
// var svg = d3.select("body")
//             .append("svg")
//             .attr("width", w)
//             .attr("height", h);
//
// svg.selectAll("circle")
//    .data(dataset[0])
//    .enter()
//    .append("circle")
//    .attr("cx", function(d) {
//       return xScale(d[0]);
//    })
//    .attr("cy", function(d) {
//       return yScale(d[1]);
//    })
//    .attr("r", function(d) {
//     	return rScale(d[1]);
// 		});


const renderCircles = (props) => {
    const circleProps = {
      cx: 100,
      cy: 100,
      r: 50,
      fill: "#ffff00"
    };
    console.log('inside render circle', props)
    return <circle {...circleProps} />;
  };

export default (props) => {
  console.log('invoked datavis')
  return (
      <g>{renderCircles(props)}</g>
  )
}
