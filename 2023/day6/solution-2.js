import input from './input.js';

const inputArr = input.trim().split('\n');

const time = inputArr[0].split(" ").filter(e => 
  { return !isNaN(parseInt(e)) }
).join('');
const distance = inputArr[1].split(" ").filter(e => 
  { return !isNaN(parseInt(e)) }
).join('');

let breakRecord = 0;
for (let i = 0; i < time; i++) {
  const hold = i;
  const remaining = time - hold;
  const travelDistance = remaining * hold;
  if (travelDistance < distance) {
    breakRecord++;
  } else {
    break;
  }
}

console.log(time - (breakRecord * 2) + 1);
