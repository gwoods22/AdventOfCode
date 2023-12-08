import fs from 'fs';

const load = (filePath = './test.txt') => {
  let data = fs.readFileSync(filePath, 'utf8')
  return data.split('\n');
}
export const intData = load().map(x => parseInt(x));
export const floatData = load().map(x => parseFloat(x));
export const strData = load();