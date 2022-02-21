"use strict";

const form = document.getElementById("addItem");
const inputNum = document.getElementById("inputNum");
const submitBtn = document.getElementById("submitBtn");
const display = document.querySelector(".display");

let dataSet = [];

const submitHandler = (e) => {
  e.preventDefault();
  if (!inputNum.value || inputNum.value === "") return;
  dataSet.push(inputNum.value);
  inputNum.value = null;
  display.innerHTML = dataSet.join(" ");

  d3.select("#foo")
    .data(dataSet)
    .enter()
    .append("p")
    .attr("margin", 20)
    .text((d) => ` ${d}€`);
};

submitBtn.addEventListener("click", submitHandler);
