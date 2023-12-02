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

let filteredGame = Object.fromEntries(Object.entries(gameObj).filter(([key, game]) => {
  let valid = true;
  console.log("====")
  game.forEach(set => {
    set['red'] = set['red'] === undefined ? 0 : set['red'];
    set['green'] = set['green'] === undefined ? 0 : set['green'];
    set['blue'] = set['blue'] === undefined ? 0 : set['blue'];
    valid = valid && set['red'] <= 12 && set['green'] <= 13 && set['blue'] <= 14;
  })
  return valid;
}))


let result = Object.keys(filteredGame);
console.log(result)
console.log(result.reduce((acc, curr) => { return acc + parseInt(curr)}, 0))