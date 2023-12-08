import { strData } from './load.js';

const startTime = new Date();

let coor = { x: 0, y: 0, aim: 0 };
for (const line of strData) {
  let direction = line.split(' ')[0];
  let val = parseInt(line.split(' ')[1]);
  // part a
  // switch (direction) {
  //   case 'forward':
  //     coor.x += val;
  //     break;
  //   case 'down':
  //     coor.y += val;
  //     break;
  //   case 'up':
  //     coor.y -= val;
  //     break;
  // }

  // part b
  switch (direction) {
    case 'forward':
      coor.x += val;
      coor.y += val * coor.aim;
      break;
    case 'down':
      coor.aim += val;
      break;
    case 'up':
      coor.aim -= val;
      break;
  }
}

console.log('Answer is', coor.x * coor.y);

console.log('Took:', (new Date() - startTime)/1000, 'seconds to run');
