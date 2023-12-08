import { strData } from './load.js';

const startTime = new Date();
const DEBUG = false;

const grid = strData.map((line) => line.split(''));

let symbols = ['*', '=', '/', '%', '#', '&', '$', '-', '@', '+'];

let starMap = new Map();

const checkAndPushToStarMap = (y, x, match) => {
  if (grid[y][x] === '*') {
    if (starMap.get(`${y}-${x}`) === undefined) {
      starMap.set(`${y}-${x}`, [match])
    } else {
      starMap.get(`${y}-${x}`).push(match)          
    }
  }
}

const isPart = (xi, xj, y, match) => {
  // ends
  if (xi !== 0) {
    if (DEBUG) console.log('Checking', y, xi - 1, grid[y][xi - 1]);
    if (symbols.includes(grid[y][xi - 1])) {
      checkAndPushToStarMap(y, xi - 1, match);
      return true;
    }
  }
  if (xj !== grid[y].length - 1) {
    if (DEBUG) console.log('Checking', y, xj + 1, grid[y][xj + 1]);
    if (symbols.includes(grid[y][xj + 1])) {
      checkAndPushToStarMap(y, xj + 1, match);
      return true;
    }
  }

  // edges
  let rows = [];
  if (y !== 0) rows.push(y - 1);
  if (y !== grid.length - 1) rows.push(y + 1);

  for (let yi of rows) {
    let i = xi - 1 >= 0 ? xi - 1 : xi;
    while (i <= xj + 1 && i < grid[yi].length) {
      if (DEBUG) console.log('Checking', yi, i, grid[yi][i]);
      if (symbols.includes(grid[yi][i])) {
        checkAndPushToStarMap(yi, i, match);
        return true;
      }
      i++;
    }
  }
  return false;
};

let vals = [];
for (const line of strData) {
  // let matches = line.match(/\d+/g);
  let matches = [...line.matchAll(/\d+/g)]
  if (matches) {
    for (let match of matches) {
      let xi = match.index;
      let xj = xi + match[0].length - 1;
      let y = strData.indexOf(line);
      if (isPart(xi, xj, y, match[0])) {
        vals.push(match[0]);
      }
    }
  }
}

let gearRatioSum = [...starMap.values()]
                    .filter(x => x.length === 2)
                    .reduce((a, b) => a + b.reduce(
                      (c, d) => c * parseInt(d), 1),
                    0);

console.log('Part A is', vals.reduce((a, b) => a + parseInt(b), 0));
console.log('Part B is', gearRatioSum);

console.log('Took:', (new Date() - startTime) / 1000, 'seconds to run');
