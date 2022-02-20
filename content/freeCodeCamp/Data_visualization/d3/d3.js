d3.select("body").append("h1").text("Learning D3");

const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

d3.select("body")
  .selectAll("h2")
  .data(dataset)
  .enter()
  .append("h2")
  .text((n) => `${n} €`)
  .style("font-family", "verdana")
  .style("color", (n) => {
    if (n < 20) return "darkred";
    return "darkgreen";
  });
