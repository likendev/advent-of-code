import input from './input.js';

let inputArr = input.trim().split('\n');

let gameObj = {};

inputArr.forEach(line => {
  let gameSetList = line.split(':');
  let n = gameSetList[0].substring(5);

  gameObj[n] = []

  gameSetList[1].trim().split(';').forEach(game => {
    let colorObj = {}
    game.trim().split(',').map(color => {
      color = color.trim().split(' ')
      colorObj[color[1]] = parseInt(color[0]);
    });
    gameObj[n].push(colorObj);
  });
})

let result = 0;

Object.fromEntries(Object.entries(gameObj).map(([key, game]) => {
  let minimumSet = {
    "red": 1,
    "green": 1,
    "blue": 1
  };
  game.forEach(set => {
    set['red'] = set['red'] === undefined ? 0 : set['red'];
    set['green'] = set['green'] === undefined ? 0 : set['green'];
    set['blue'] = set['blue'] === undefined ? 0 : set['blue'];

    minimumSet['red'] = Math.max(minimumSet['red'], set['red']);
    minimumSet['green'] = Math.max(minimumSet['green'], set['green']);
    minimumSet['blue'] = Math.max(minimumSet['blue'], set['blue']);
  })

  result += Object.values(minimumSet).reduce((acc, curr) => { return curr * acc }, 1)

  return minimumSet;
}))

console.log(result)
