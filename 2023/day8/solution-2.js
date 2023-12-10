import input from './input.js';

const inputArr = input.trim().split('\n').filter(e => e);
const instruction = inputArr.shift();
const map = inputArr.reduce((acc, assignment) => {
  const [key, values] = assignment.match(/(\w+) = \(([^)]+)\)/).slice(1);
  const [leftValue, rightValue] = values.split(',').map(item => item.trim());
  acc[key] = { 'L': leftValue, 'R': rightValue };
  return acc;
}, {});
const destination = 'ZZZ';
let step = 0;

const move = (arr, currentInstruction) => {
  if(arr.every(str => str.endsWith('Z'))) {
    return step;
  }
  step++;
  let nextIndex = currentInstruction + 1 === instruction.length ? 0 : currentInstruction + 1;
  let nextArr = arr.map(e => {
    return map[e][instruction[currentInstruction]]
  });

  return move(nextArr, nextIndex)
}

const findPath = (currentLoc, currentInstruction) => {
  step++;
  if(currentLoc[instruction[currentInstruction]].endsWith('Z')) {
    return step;
  }
  currentInstruction++;
  let ins = currentInstruction >= instruction.length ? 0 : currentInstruction;
  return findPath(map[currentLoc[instruction[ins === 0 ? ins : ins - 1]]], ins)
}

let initialStep = Object.keys(map).filter(e => e.endsWith('A'));
let stepsArr = [];

initialStep.forEach(e => {
  step = 0;
  stepsArr.push(findPath(map[e], 0))
})

const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);

console.log(stepsArr)
console.log(stepsArr.reduce(lcm))
