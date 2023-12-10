import input from './input.js';

const inputArr = input.trim().split('\n').map(e => { return e.split('') });


// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// l is a 90-degree bend connecting north and east.
// j is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// f is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// s is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

const startPos = inputArr.reduce((acc, row, x) => {
  const y = row.indexOf('S');
  return y !== -1 ? [x, y] : acc;
}, undefined);

let mapHistory = [];

const validPipe = (position, currentPos, orientation) => {
  if(position[0] === startPos[0] && position[1] === startPos[1]) {
    return false;
  }
  if(position[0] < 0 || position[1] < 0 || position[0] > inputArr.length || position[1] > inputArr[0].length) {
    return false;
  }
  let valid = false;
  const character = inputArr[position[0]][position[1]];
  const currentChar = inputArr[currentPos[0]][currentPos[1]];
  if(character === '.') {
    return false;
  }
  switch (orientation) {
    case 'left':
      valid = (currentChar === 'S' || currentChar === '-' || currentChar === 'J' || currentChar === '7') && (character === '-' || character === 'L' || character === 'F');
      break;
    case 'right':
      valid = (currentChar === 'S' || currentChar === '-' || currentChar === 'L' || currentChar === 'F') && (character === '-' || character === 'J' || character === '7');
      break;
    case 'top':
      valid = (currentChar === 'S' || currentChar === '|' || currentChar === 'L' || currentChar === 'J') && (character === '|' || character === '7' || character === 'F');
      break;
    case 'bottom':
      valid = (currentChar === 'S' || currentChar === '|' || currentChar === 'F' || currentChar === '7') && (character === '|' || character === 'J' || character === 'L');
      break;
  }

  return !mapHistory.some(history =>
    history[0] === position[0] && history[1] === position[1]
  ) && valid;
}

const navigate = (currentPos) => {
  const left = [currentPos[0], currentPos[1] - 1];
  const right = [currentPos[0], currentPos[1] + 1];
  const top = [currentPos[0] - 1, currentPos[1]];
  const bottom = [currentPos[0] + 1, currentPos[1]];

  let nextPos;

  if (validPipe(left, currentPos, 'left')) {
    nextPos = left;
  } else if(validPipe(right, currentPos, 'right')) {
    nextPos = right;
  } else if(validPipe(top, currentPos, 'top')) {
    nextPos = top;
  } else if(validPipe(bottom, currentPos, 'bottom')) {
    nextPos = bottom;
  } else {
    return startPos;
  }

  mapHistory.push(nextPos)

  return navigate(nextPos);
}

console.log('startPos: ', startPos)
navigate(startPos)
console.log(Math.floor((mapHistory.length + 1) / 2))