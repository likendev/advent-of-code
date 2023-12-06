import input from './input.js';

let inputArr = input.trim().split('\n');

const time = inputArr[0].split(" ").filter(e => {return !isNaN(parseInt(e))});
const distance = inputArr[1].split(" ").filter(e => {return !isNaN(parseInt(e))});

// console.log(time, distance);

let list = [];

for(let i = 0; i < time.length; i++) {
  let breakRecord = 0;
  for (let j = 0; j < time[i]; j++) {
    let hold = j;
    let remaining = time[i] - hold;
    let travelDistance = remaining * hold;
    console.log('distance: ', travelDistance)
    if (travelDistance > distance[i]) {
      breakRecord++;
    }
  }

  list.push(breakRecord);
}

console.log(list)

let result = list.reduce((a, c) => {return a * c}, 1)


console.log('result: ', result)