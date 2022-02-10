//HOW TO COMPILE: npx tsc filename.ts

// Primitives: number, string, boolean
// complex: array, object
// function types, parameters

let age: number = 53;
let username: string = "John Johnson";
let isAlive: boolean;
isAlive = true;

let hobbies: string[];
hobbies = ["hey", "you"];

let random: any;

let person: {
  name: string;
  age: number;
};

person = {
  name: "Gus",
  age: 11,
};

let people: { name: string; age: number }[];
