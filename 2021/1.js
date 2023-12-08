import { intData } from './load.js';

const startTime = new Date();

let increaseCount = 0;
for (let i = 0; i < intData.length - 1; i += 1) {
  if (intData[i] < intData[i + 1]) {
    increaseCount += 1;
  }
}
console.log('Part A is', increaseCount);

let slidingWindowCount = 0;
for (let i = 0; i < intData.length - 3; i += 1) {
  let window1 = intData[i] + intData[i+1] + intData[i+2];
  let window2 = intData[i+1] + intData[i+2] + intData[i+3];
  if (window1 < window2) {
    slidingWindowCount += 1;
  }
}
console.log('Part B is', slidingWindowCount);

console.log('Took:', (new Date() - startTime)/1000, 'seconds to run');
