import * as d3 from 'd3'
import * as DataType from './DataType';

export function drawChart () {
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
}

function updateChartDots () {
  // Add dots
  const svg = d3.select('svg');
  svg
    .append('g')
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
      return x(d.x);
    })
    .attr('cy', function (d) {
      return y(d.y);
    })
    .attr('r', 1.5)
    .style('fill', '#69b3a2');
}


export function initCharts (readings: DataType.Reading[], index: number) {
  // const svg = d3.select('svg');
  // svg.selectAll('*').remove();
  // drawChart();
  // updateChartDots();
}