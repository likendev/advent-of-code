import input from './input.js';

let inputArr = input.trim().split('\n');


inputArr = inputArr.map(line => {
  return line.split(':')[1].trim();
})

let winMap = {};

inputArr.forEach((line, index) => {
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
      sum++;
    }
  })

  winMap[index + 1] = [sum];
})

let newMap = winMap;

Object.keys(newMap).forEach((key, index) => {
  let i = index;
  let bonusCount = newMap[key][0];
  let maxLength = Object.keys(newMap).length;
  let loopCount = 0;
  while(loopCount < bonusCount && i + 1 < maxLength) {
    let obj = newMap[Object.keys(newMap)[i + 1]]
    for(let bonusLoop = 0; bonusLoop < newMap[Object.keys(newMap)[index]].length; bonusLoop++){
      newMap[Object.keys(newMap)[i + 1]].push(newMap[Object.keys(newMap)[i + 1]][0])
    }
    i++;
    loopCount++;
  }
  console.log(index)
})

let total = inputArr.length;

Object.keys(newMap).forEach(key => {
  let count = newMap[key];
  total += count.reduce((a, c) => { return a + c}, 0)
})

console.log(total)