import input from './input.js';

const inputArr = input.trim().split('\n').map(e => { return e.split('') });

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

navigate(startPos)

const shrinkMap = (history) => {
  const position = history.reduce(
    (acc, current) => {
      acc.minX = Math.min(acc.minX, current[0]);
      acc.minY = Math.min(acc.minY, current[1]);
      acc.maxX = Math.max(acc.maxX, current[0]);
      acc.maxY = Math.max(acc.maxY, current[1]);
      return acc;
    },
    {
      minX: history[0][0],
      minY: history[0][1],
      maxX: history[0][0],
      maxY: history[0][1]
    }
  );

  return position;
};

mapHistory.push(startPos)
const shrinkedMapPosition = shrinkMap(mapHistory);

const findEnclosed = (line, xIndex) => {
  let enclosedTiles = [];
  let enclosed = false;
  for(let i = 0; i < line.length; i++) {
    const isHistory = mapHistory.some(history => {
      return history[0] === xIndex && history[1] === i + shrinkedMapPosition.minY
    });
    if(isHistory && (line[i] === '|' || line[i] === 'J' || line[i] === 'L' || line[i] === 'S')) {
      enclosed = !enclosed;
    }

    if(enclosed && !isHistory) {
      enclosedTiles.push(line[i]);
    }
  }

  return enclosedTiles;
}

let shrinkedMap = inputArr.slice(shrinkedMapPosition.minX, shrinkedMapPosition.maxX + 1).map(e => {
  return e.slice(shrinkedMapPosition.minY, shrinkedMapPosition.maxY+1);
});

let insideElement = [];
shrinkedMap.forEach((e, index) => {
  insideElement = insideElement.concat(findEnclosed(e, index + shrinkedMapPosition.minX));
})

console.log(insideElement.length)