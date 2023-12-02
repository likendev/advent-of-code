import input from './input.js';

let inputArr = input.trim().split('\n');

let numArr = inputArr.map(e => {
  return e.replace(/\D/g, '');
})

numArr = numArr.map(e => {
  if(e.length > 1) {
    return parseInt(e[0] + e[e.length-1]);
  } else {
    return parseInt(e[0] + e[0]);
  }
})

let sum = numArr.reduce((accumulator, current) => {return accumulator + current});

console.log(sum);