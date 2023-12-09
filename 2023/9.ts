import { strData } from './load.js';

const startTime = performance.now();

let part1: number[] = [];
let part2: number[] = [];

for (let line of strData) {
  let row: number[] = line.split(' ').map(Number);

  let lastDigits: number[] = [row.slice(-1)[0]];
  let firstDigits: number[] = [row[0]];

  while (row.some((x) => x !== 0)) {
    row = row.slice(1).map((x, i) => x - row[i]);
    lastDigits.push(row.slice(-1)[0]);
    firstDigits.push(row[0]);
  }

  part1.push(lastDigits.reduce((a, b) => a + b));

  let rowPart2 = firstDigits.reduce((a, b, i) => 
    i % 2 === 0 ? a + b : a - b
  );
  part2.push(rowPart2);
}

console.log('Part A is', part1.reduce((a, b) => a + b));
console.log('Part B is', part2.reduce((a, b) => a + b));

console.log('Took:', ((performance.now() - startTime)/1000).toFixed(4), 'seconds to run');
