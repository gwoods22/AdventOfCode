import { strData } from './load.js';

const startTime = new Date();

const ELF_RED = 12;
const ELF_GREEN = 13;
const ELF_BLUE = 14;

let possibleGames = []
let powers = []

for (const line of strData) {
  let n = parseInt(line.match(/Game (\d+):/)[1]);
  let minRed, minGreen, minBlue;
  let rounds = line.match(/:(.*)/)[1].split(';');
  for (const round of rounds) {
    let red = round.match(/(\d+) red/) ? parseInt(round.match(/(\d+) red/)[1]) : 0;
    let green = round.match(/(\d+) green/) ? parseInt(round.match(/(\d+) green/)[1]) : 0;
    let blue = round.match(/(\d+) blue/) ? parseInt(round.match(/(\d+) blue/)[1]) : 0;
    
    if (!minRed || red > minRed) minRed = red;
    if (!minGreen || green > minGreen) minGreen = green;
    if (!minBlue || blue > minBlue) minBlue = blue;
  }
  if (minRed <= ELF_RED && minGreen <= ELF_GREEN && minBlue <= ELF_BLUE) {
    possibleGames.push(n);
  }
  powers.push(minRed * minGreen * minBlue);
}

// console.log(possibleGames);

console.log('Part A is', possibleGames.reduce((a, b) => a + b, 0));
console.log('Part B is', powers.reduce((a, b) => a + b, 0));

console.log('Took:', (new Date() - startTime)/1000, 'seconds to run');