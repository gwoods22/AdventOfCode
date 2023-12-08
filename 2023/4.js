import { strData } from './load.js';

const startTime = new Date();

let points = 0;

let cardCount = {}

for (const line in strData) {
  let regex = strData[line].match(/Card\s+(\d+):\s+([\d|\s]+)\s+\|\s+([\d|\s]+)/);
  let cardNum = parseInt(regex[1]);
  let results = regex[2].split(/\s+/);
  let numbers = regex[3].split(/\s+/);

  let winners = []
  for (let num of results) {
    if (numbers.includes(num)) {
      winners.push(num)
    }
  }
  points += winners.length > 0 ? Math.pow(2, winners.length - 1) : 0;

  let i = cardNum;
  let stopValue = i + winners.length;
  let increaseValue = cardCount[i] = cardCount[i] ? cardCount[i] + 1 : 1;
  cardCount[i] = increaseValue;
  i++;
  while(i < stopValue + 1) {
    cardCount[i] = cardCount[i] ? cardCount[i] + increaseValue : increaseValue;
    i++;
  }
}

// 1: 1
// 2: 2
// 3: 4
// 4: 8
// 5: 14
// 6: 1

// less than 23756
console.log('Part A is', points);
console.log('Part B is', Object.values(cardCount).reduce((a, b) => a + b, 0));

console.log('Took:', (new Date() - startTime)/1000, 'seconds to run');