d3.select("body").append("h1").text("Learning D3");

// const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

// d3.select("body")
//   .selectAll("h2")
//   .data(dataset)
//   .enter()
//   .append("h2")
//   .text((n) => `${n} €`)
//   .style("font-family", "verdana")
//   .style("color", (n) => {
//     if (n < 20) return "darkred";
//     return "darkgreen";
//   });

// const w = 500;
// const h = 100;

// const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

// svg
//   .selectAll("rect")
//   .data(dataset)
//   .enter()
//   .append("rect")
//   .attr("x", (d, i) => i * 30)
//   .attr("y", (d, i) => h - 3 * d)
//   .attr("width", 25)
//   .attr("height", (d, i) => 3 * d);

/// scatter

const dataset = [
  [34, 78],
  [109, 280],
  [310, 120],
  [79, 411],
  [410, 220],
  [233, 145],
  [333, 96],
  [222, 333],
  [78, 320],
  [21, 123],
];

const w = 500;
const h = 500;
const padding = 70;

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, (d) => d[0])])
  .range([padding, w - padding]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, (d) => d[1])])
  .range([h - padding, padding]);

const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

svg
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d[0]))
  .attr("cy", (d) => yScale(d[1]))
  .attr("r", 7)
  .attr("fill", "darkred");

svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text((d) => d[0] + ", " + d[1])
  .attr("x", (d) => xScale(d[0] + 10))
  .attr("y", (d) => yScale(d[1]));
