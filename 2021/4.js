import { strData } from './load.js';

const startTime = new Date();

const didWin = (game) => {
  // check cols
  for (let i = 0; i < 5; i++) {
    if (game.every((row) => row[i] === 'X')) {
      return true;
    }
  }
  // check rows
  for (let row of game) {
    if (row.every((num) => num === 'X')) {
      return true;
    }
  }
  // // check diagonals
  // if (game[0][0] === 'X' && game[1][1] === 'X' && game[2][2] === 'X' && game[3][3] === 'X' && game[4][4] === 'X') {
  //   return true;
  // }
  // if (game[0][4] === 'X' && game[1][3] === 'X' && game[2][2] === 'X' && game[3][1] === 'X' && game[4][0] === 'X') {
  //   return true;
  // }

  return false;
};

const countScore = (game) =>
  game.reduce((a, b) => {
    return (
      a +
      b.reduce((c, d) => {
        if (d !== 'X') {
          return c + parseInt(d);
        } else {
          return c;
        }
      }, 0)
    );
  }, 0);

const partA = (nums, games) => {
  for (let num of nums) {
    for (let game of games) {
      for (let row of game) {
        if (row.indexOf(num) >= 0) {
          row[row.indexOf(num)] = 'X';
        }
      }
      if (didWin(game)) {
        return countScore(game) * parseInt(num);
      }
    }
  }
};

const partB = (nums, games) => {
  let winners = 0;
  const totalGames = games.length;
  for (let num of nums) {
    for (let game of games) {
      for (let row of game) {
        if (row.indexOf(num) >= 0) {
          row[row.indexOf(num)] = 'X';
        }
      }
      if (didWin(game)) {
        winners++;
        games = games.filter((g) => g !== game);
        if (winners === totalGames) {
          return countScore(game) * parseInt(num);
        }
      }
    }
  }
};

const nums = strData[0].split(',');

let line = 2;
let game = 0;
let aGames = [[]];
let bGames = [[]];
while (line < strData.length) {
  if (strData[line] === '') {
    line++;
    game++;
    aGames.push([]);
    bGames.push([]);
  } else {
    aGames[game].push(strData[line].trim().split(/\s+/));
    bGames[game].push(strData[line].trim().split(/\s+/));
    line++;
  }
}

console.log('Part A is', partA(nums, aGames));
console.log('Part B is', partB(nums, bGames));

console.log('Took:', (new Date() - startTime) / 1000, 'seconds to run');
