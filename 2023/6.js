import { strData } from './load.js';

const startTime = new Date();

let times = strData[0].match(/Time:\s+(.*)/)[1].split(/\s+/).map(x => parseInt(x))
let distances = strData[1].match(/Distance:\s+(.*)/)[1].split(/\s+/).map(x => parseInt(x))

const getAnswer = (time, distance) => {
  let waitTime = 1;
  let answers = [];
  while(waitTime < time) {
    let currentDist = waitTime * (time - waitTime);
    if (currentDist > distance) {
      answers.push(waitTime);
    }
    waitTime++;
  }
  return answers.length;
}

const getAnswerFast = (time, distance) => {
  let answers = [];

  let waitTime = 1;
  while(waitTime * (time - waitTime) <= distance) {
    waitTime++;
  }
  answers.push(waitTime);

  waitTime = time - 1;
  while(waitTime * (time - waitTime) <= distance) {
    waitTime--;
  }
  answers.push(waitTime);

  return answers[1] - answers[0] + 1;
}

const part1 = () => {
  let answers = []

  for (let i = 0; i < times.length; i++) {
    // answers.push(getAnswer(times[i], distances[i]));
    answers.push(getAnswerFast(times[i], distances[i]));
  }
  return answers
}

let time2 = parseInt(strData[0].match(/Time:\s+(.*)/)[1].split(/\s+/).join(''));
let distance2 = parseInt(strData[1].match(/Distance:\s+(.*)/)[1].split(/\s+/).join(''));

console.log('Part A is', part1().reduce((a, b) => a * b));
// console.log('Part B is', getAnswer(time2, distance2));
console.log('Part B is', getAnswerFast(time2, distance2));

console.log('Took:', (new Date() - startTime)/1000, 'seconds to run');