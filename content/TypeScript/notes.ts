// Primitives: number, string, boolean
// complex: array, object
// function types, parameters

let age: number = 53;
let username: string | string[] = "John Johnson";
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

// type inference

let course: string | number | boolean = "react guide";
course: 12;

type Person = { name: string; age: number };

let team: Person[];

// functions

function add(a: number, b: number): number {
  return a + b;
}

function cLog(value: any): void {
  console.log(value);
}

// GENERICS

function insertAtStart<T>(array: T[], value: T) {
  const newArr = [value, ...array];
  return newArr;
}

const numArray = insertAtStart([1, 2, 3], -2);
const strArray = insertAtStart(["a", "b"], "x");
//
