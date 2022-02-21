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
};

submitBtn.addEventListener("click", submitHandler);

// d3.select("div")
//   .select("#foo")
//   .data([1, 2, 3])
//   .enter()
//   .append("h2")
//   .text((d) => `${d}€`);
