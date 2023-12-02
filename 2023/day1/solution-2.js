import input from './input.js';

let inputArr = input.trim().split('\n');

let numMap = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
}

inputArr = inputArr.map(e=>e.replace(/oneight/g,"oneeight"))
                  .map(e=>e.replace(/threeight/g,"threeeight"))
                  .map(e=>e.replace(/fiveight/g,"fiveeight"))
                  .map(e=>e.replace(/nineight/g,"nineeight"))
                  .map(e=>e.replace(/twone/g,"twoone"))
                  .map(e=>e.replace(/sevenine/g,"sevennine"))
                  .map(e=>e.replace(/eightwo/g,"eighttwo"))

let numArr = inputArr.map(e => {
  Object.keys(numMap).forEach(num => {
    e = e.replace(num, numMap[num]);
  });
  return e;
})

numArr = numArr.map(e => {
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