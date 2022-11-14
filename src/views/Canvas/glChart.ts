import * as d3 from 'd3'
import * as DataType from './DataType';


// function drawChart () {
    
// }

export function initCharts (readings: DataType.Reading[], index: number) {
//   d3.selectAll('div').remove(); 
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460,
    height = 400;
  
  // append the svg object to the body of the page
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  //Read the data
  // Add X axis
  const x = d3.scaleLinear().domain([ -5, 5 ]).range([ 0, width ]);
  const xAxis = svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x));
  
  // Add Y axis
  const y = d3.scaleLinear().domain([ -5, 5 ]).range([ height, 0 ]);
  svg.append('g').call(d3.axisLeft(y));
  
  // Add dots
  svg
    .append('g')
    .selectAll('circle')
    .data(readings)
    .join('circle')
    .attr('cx', function (d) {
      return x(readings[index].posX);
    })
    .attr('cy', function (d) {
      return y(readings[index].posY);
    })
    .attr('r', 5);
}