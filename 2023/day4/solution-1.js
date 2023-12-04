import input from './input.js';

let inputArr = input.trim().split('\n');


inputArr = inputArr.map(line => {
  return line.split(':')[1].trim();
})

let total = 0;

inputArr.forEach(line => {
  let winningNums = Object.assign(...(line.split('|')[0].trim().split(' ').filter(e => {return e !== ''})).map(k => ({ [k]: 0})));
  let owningNum = line.split('|')[1].trim().split(' ').filter(e => {
    return e !== '';
  })

  owningNum.forEach(num => {
    if(winningNums[num] !== undefined) {
      winningNums[num]++;
    }
  })

  let sum = 0;
  Object.keys(winningNums).forEach(key => {
    if(winningNums[key] > 0) {
      // console.log(winningNums[key])
      sum = sum > 0 ? sum * 2 : 1;
    }
  })

  total += sum;
})

console.log(total)