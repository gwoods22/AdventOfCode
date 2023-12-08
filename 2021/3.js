import { strData } from './load.js';

const startTime = new Date();

let gamma = '';
let epsilon = '';

const moreOnesInIndex = (lines, index) => {
  let oneCount = 0;
  for (const line of lines) {
    if (line[index] == '1') {
      oneCount++;
    }
  }
  return oneCount >= lines.length/2;
}


for (let i=0; i<strData[0].length; i++) {
  if (moreOnesInIndex(strData, i)) {
    gamma += '1';
    epsilon += '0';
  } else {
    gamma += '0';
    epsilon += '1';
  }
}
let powerConsumption = parseInt(gamma, 2) * parseInt(epsilon, 2);



let o2;
let o2Data = strData;
let index = 0

while(o2Data.length > 2) {
  let bit = moreOnesInIndex(o2Data, index) ? '1' : '0';
  for (let line of o2Data) {
    if (line[index] !== bit) {
      o2Data = o2Data.filter(x => x !== line);
    }
  }
  index++;
}
if (o2Data.length == 1) o2 = o2Data[0], 2;
else {
  let a = o2Data[0].slice(index, index+1);
  let b = o2Data[1].slice(index, index+1);
  while (a === b) {
    index++;
    a = o2Data[0].slice(index, index+1);
    b = o2Data[1].slice(index, index+1);
  }
  o2 = a === '1' ? o2Data[0] : o2Data[1]; 
}
o2 = parseInt(o2, 2);


let co2;
let co2Data = strData;
index = 0

while(co2Data.length > 2) {
  let bit = moreOnesInIndex(co2Data, index) ? '0' : '1';
  for (let line of co2Data) {
    if (line[index] !== bit) {
      co2Data = co2Data.filter(x => x !== line);
    }
  }
  index++;
}
if (co2Data.length == 1) co2 = co2Data[0];
else {
  let a = co2Data[0].slice(index, index+1);
  let b = co2Data[1].slice(index, index+1);
  while (a === b) {
    index++;
    a = co2Data[0].slice(index, index+1);
    b = co2Data[1].slice(index, index+1);
  }
  co2 = a === '0' ? co2Data[0] : co2Data[1];
}
co2 = parseInt(co2, 2);


const partBAttempt1 = () => {
  let o2 = '';
  let co2 = '';
  let o2Data = strData;
  for (let i=0; i<gamma.length; i++) {
    for (const line of o2Data) {
      if (line[i] !== gamma[i]) {
        o2Data = o2Data.filter(x => x !== line);
      }
    }
    if (o2Data.length == 2 &&( o2Data[0][i] !== o2Data[1][i])) {
      let search = gamma.slice(0,i+1) + '1';
      o2 = o2Data.find(x => x.includes(search));
      if (o2 == undefined) console.log('error');
      break;
    } else if (o2Data.length == 1) {
      o2 = o2Data[0];
      break;
    }
  }


  // instead of comparing to epsilon you're gonna have to actually comb through to find the most/least common element
  let co2Data = strData;
  for (let i=0; i<epsilon.length; i++) {
    for (const line of co2Data) {
      if (line[i] !== epsilon[i]) {
        co2Data = co2Data.filter(x => x !== line);
      }
    }
    if (co2Data.length == 2 &&( co2Data[0][i] !== co2Data[1][i])) {
      let search = epsilon.slice(0,i+1) + '1';
      co2 = co2Data.find(x => x.includes(search));
      if (co2 == undefined) {
        console.log('error');
      }
      break;
    } else if (co2Data.length == 1) {
      co2 = co2Data[0];
      break;
    } else if (i == epsilon.length - 1) {
      console.log('error');
    }
  }
  return parseInt(o2, 2) * parseInt(co2, 2);
}
// let lifeSupport = partBAttempt1();


console.log('Part A is', powerConsumption);
console.log('Part B is', o2*co2);

console.log('Took:', (new Date() - startTime)/1000, 'seconds to run');