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

const move = (currentLoc, currentInstruction) => {
  step++;
  if(currentLoc[instruction[currentInstruction]] === destination) {
    return step;
  }
  currentInstruction++;
  let ins = currentInstruction >= instruction.length ? 0 : currentInstruction;
  return move(map[currentLoc[instruction[ins === 0 ? ins : ins - 1]]], ins)
}

console.log(move(map['AAA'], 0))
