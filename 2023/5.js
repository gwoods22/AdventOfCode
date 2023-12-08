import { strData } from './load.js';

const startTime = new Date();

let seedSoil = [];
let soilFert = [];
let fertWater = [];
let waterLight = [];
let lightTemp = [];
let tempHumid = [];
let humidLocation = [];

let arrays = [
  seedSoil,
  soilFert,
  fertWater,
  waterLight,
  lightTemp,
  tempHumid,
  humidLocation,
];

const parseMap = (index, arr) => {
  index++;
  while (strData[index] !== '' && strData[index] !== undefined) {
    let [
      dest, 
      source, 
      length
    ] = strData[index].split(/\s+/).map(x => parseInt(x));

    arr.push({
      min: source,
      max: source + length - 1,
      factor: dest - source
    })
    // while (i < length) {
    //   map[source + i] = dest + i;
    //   i++;
    // }
    index++;
  }
  return index + 1;
}

const parseSeeds = location => {
  let val = parseInt(location);
  for (let i=arrays.length - 1; i >= 0; i--) {
    for (let obj of arrays[i]) {
      if (val - obj.factor >= obj.min && 
          val - obj.factor <= obj.max
      ) {
        val = val - obj.factor
        break;
      }
    }
  }
  return val;
}

const parseLocation = seed => {
  let val = parseInt(seed);
  for (let array of arrays) {
    for (let obj of array) {
      if (val >= obj.min && val <= obj.max) {
        val = val + obj.factor;
        break;
      }
    }
  }
  return val;
}

const day4 = () => {
  let seedData = strData[0].slice(7).split(/\s+/);
  // let seeds = []
  // for (let i = 0; i < seedData.length; i += 2) {
  //   let start = parseInt(seedData[i]);
  //   for (let j = 0; j < parseInt(seedData[i + 1]); j++) {
  //     seeds.push(start + j)
  //   }
  // }

  let index = 2;
  while (strData[index] !== undefined) {
    switch (strData[index]) {
      case 'seed-to-soil map:':
        index = parseMap(index, seedSoil);
        break;
      case 'soil-to-fertilizer map:':
        index = parseMap(index, soilFert);
        break;
      case 'fertilizer-to-water map:':
        index = parseMap(index, fertWater);
        break;
      case 'water-to-light map:':
        index = parseMap(index, waterLight);
        break;
      case 'light-to-temperature map:':
        index = parseMap(index, lightTemp);
        break;
      case 'temperature-to-humidity map:':
        index = parseMap(index, tempHumid);
        break;
      case 'humidity-to-location map:':
        index = parseMap(index, humidLocation);
        break;
      default:
        console.log('Error');
        break;
    }
  }

  let locations = seedData.map(x => parseLocation(x));
  console.log('Part A is', Math.min(...locations));
  
  let seeds2 = []
  for (let i = 0; i < seedData.length; i += 2) {
    seeds2.push({
      start: parseInt(seedData[i]),
      end: parseInt(seedData[i]) + parseInt(seedData[i + 1])
    })
  }
  let testLocation = 0;
  let looking = true;
  while (looking) {
    let testSeed = parseSeeds(testLocation);
    for (let seed of seeds2) {
      if (testSeed >= seed.start && testSeed < seed.end) {
        looking = false;
      }
    }
    testLocation++;
  }
  console.log('Part B is', testLocation - 1);

  console.log('Took:', (new Date() - startTime)/1000, 'seconds to run');
}
day4();
