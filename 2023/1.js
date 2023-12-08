import { strData } from './load.js';

const startTime = new Date();

const numsArr = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];
const nums = {
  one: '1',
  two: '2',
  six: '6',
  four: '4',
  five: '5',
  nine: '9',
  three: '3',
  seven: '7',
  eight: '8',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
};

const replaceTextNumbers = (data) => {
  let reg = new RegExp('(' + Object.keys(nums).join('|') + ')');
  return data.map((line) => {
    // find first match
    let match = line.match(reg);
    if (match) {
      let index = line.match(reg).index;
      // if there's a digit before the match don't replace
      if (line.slice(0, index).match(/\d/) === null) {
        line = line.replace(match[0], nums[match[0]]);
      }
    }

    // find last 3 char match
    if (line.match(/one|two|six/)) {
      let n = 3;
      let i = line.length - n;
      while (line.slice(i, i + n).match(reg) === null) {
        i--;
      }
      let match3 = line.slice(i, i + n).match(reg);
      line = line.slice(0, i) + nums[match3[0]] + line.slice(i + n);
    }

    // find last 4 char match
    if (line.match(/four|five|nine/)) {
      let n = 4;
      let i = line.length - n;
      while (line.slice(i, i + n).match(reg) === null) {
        i--;
      }
      let match4 = line.slice(i, i + n).match(reg);
      line = line.slice(0, i) + nums[match4[0]] + line.slice(i + n);
    }

    // find last 5 char match
    if (line.match(/three|seven|eight/)) {
      let n = 5;
      let i = line.length - n;
      while (line.slice(i, i + n).match(reg) === null) {
        i--;
      }
      let match5 = line.slice(i, i + n).match(reg);
      line = line.slice(0, i) + nums[match5[0]] + line.slice(i + n);
    }
    return line;
  });
};

const findNumbers = (lineData) => {
  let vals = [];
  for (let line of lineData) {
    let val = '';
    let i = 0;
    while (isNaN(line[i])) {
      i++;
      if (i >= line.length) {
        // something has gone wrong
        break;
      }
    }
    val += line[i];
    i = line.length - 1;
    while (isNaN(line[i])) {
      i--;
      if (i < 0) {
        // something has gone wrong
        break;
      }
    }
    val += line[i];
    vals.push(parseInt(val));
  }
  return vals;
};

const part2rework = (data) => {
  let reg = new RegExp(numsArr.join('|') + '|\\d');
  return data.map((line) => {

    let firstDigit = nums[line.match(reg)[0]];
    let lastDigit;

    // find last digit match
    if (line.match(/\d/)) {
      let n = 1;
      let i = line.length - n;
      while (line.slice(i, i + n).match(reg) === null) {
        i--;
      }
      lastDigit = { 
        match: nums[line.slice(i, i + n).match(reg)[0]], 
        i: i 
      }
    }
    // find last 3 char match
    if (line.match(/one|two|six/)) {
      let n = 3;
      let i = line.length - n;
      while (line.slice(i, i + n).match(reg) === null) {
        i--;
      }
      if (!lastDigit || lastDigit.i < i) {
        lastDigit = { 
          match: nums[line.slice(i, i + n).match(reg)[0]], 
          i: i 
        }
      }
    }

    // find last 4 char match
    if (line.match(/four|five|nine/)) {
      let n = 4;
      let i = line.length - n;
      while (line.slice(i, i + n).match(reg) === null) {
        i--;
      }
      if (!lastDigit || lastDigit.i < i) {
        lastDigit = { 
          match: nums[line.slice(i, i + n).match(reg)[0]], 
          i: i 
        }
      }
    }

    // find last 5 char match
    if (line.match(/three|seven|eight/)) {
      let n = 5;
      let i = line.length - n;
      while (line.slice(i, i + n).match(reg) === null) {
        i--;
      }
      if (!lastDigit || lastDigit.i < i) {
        lastDigit = { 
          match: nums[line.slice(i, i + n).match(reg)[0]], 
          i: i 
        }
      }
    }
    
    // console.log(line + '-> ' + firstDigit + lastDigit.match);
    return parseInt(firstDigit + lastDigit.match);
  });
};

let valsA = findNumbers(strData);
console.log('Part A is', valsA.reduce((a, b) => a + b, 0));

// Part B Attempt 1
//
// let lineData = replaceTextNumbers(strData);
// let vals = findNumbers(lineData);
// console.log(vals.length);
// console.log('Answer is', vals.reduce((a, b) => a + b, 0));

// Part B Attempt 2
let valsB = part2rework(strData);
console.log('Part B is', valsB.reduce((a, b) => a + b, 0));
console.log('Took:', (new Date() - startTime)/1000, 'seconds to run');
