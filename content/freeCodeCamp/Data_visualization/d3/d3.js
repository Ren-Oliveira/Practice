d3.select("body").append("h1").text("Learning D3");

const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

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

const w = 500;
const h = 100;

const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 30)
  .attr("y", (d, i) => h - 3 * d)
  .attr("width", 25)
  .attr("height", (d, i) => 3 * d);
