import { strData } from './load.js';

const startTime = performance.now();

class Node {
  name: string;
  left: Node;
  right: Node;

  constructor(name: string) {
    this.name = name;
  }
}

const parseNodesA = (): Node => {
  let nodes = new Map<string, Node>();
  let a: Node | undefined;

  for (let i = 2; i < strData.length; i++) {
    let match = strData[i].match(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/);
    let [name, left, right] = match.slice(1);

    let node = nodes.get(name) || new Node(name);

    if (nodes.has(left)) {
      node.left = nodes.get(left)!;
    } else {
      node.left = new Node(left);
      nodes.set(left, node.left);
    }

    if (nodes.has(right)) {
      node.right = nodes.get(right)!;
    } else {
      node.right = new Node(right);
      nodes.set(right, node.right);
    }

    if (!nodes.has(name)) nodes.set(name, node);

    if (name === 'AAA') a = node;
  }

  if (!a) throw new Error('No A');
  return a;
}

const partA = (): number => {
  const instr = strData[0].split('');

  let nodeA: Node = parseNodesA();  
    
  let node: Node = nodeA;
  let steps: number = 0;
  let i: number = 0;
  while (node.name !== 'ZZZ') {
    if (instr[i] === 'L') {
      node = node.left;
    } else {
      node = node.right;
    }
    steps++;
    i = (i + 1) % instr.length;
  }
  return steps;
}

const parseNodesB = (): Node[] => {
  let nodes = new Map<string, Node>();
  let theAs: Node[] = [];

  for (let i = 2; i < strData.length; i++) {
    // let match = strData[i].match(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/);
    let match = strData[i].match(/([A-Z0-9]+) = \(([A-Z0-9]+), ([A-Z0-9]+)\)/);
    let [name, left, right] = match.slice(1);

    let node = nodes.get(name) || new Node(name);

    if (nodes.has(left)) {
      node.left = nodes.get(left)!;
    } else {
      node.left = new Node(left);
      nodes.set(left, node.left);
    }

    if (nodes.has(right)) {
      node.right = nodes.get(right)!;
    } else {
      node.right = new Node(right);
      nodes.set(right, node.right);
    }

    if (!nodes.has(name)) nodes.set(name, node);

    if (name.slice(-1) === 'A') theAs.push(node);
  }

  return theAs;
}

const lowestCommonMultiple = (arr: number[]): number => {
  let lcm = arr[0];
  for (let i = 1; i < arr.length; i++) {
    lcm = (lcm * arr[i]) / greatestCommonDivisor(lcm, arr[i]);
  }
  return lcm;
}

const greatestCommonDivisor = (lcm: number, arg1: number): number => {
  let a = lcm;
  let b = arg1;
  while (b !== 0) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

const partB = (): number => {
  const instr = strData[0].split('');

  let startNodes: Node[] = parseNodesB();
  
  let nodes: Node[] = startNodes;
  let steps: number = 0;
  let i: number = 0;
  let lcmMap = new Map<string, number>();

  while (lcmMap.size < startNodes.length) { 
    if (instr[i] === 'L') {
      nodes = nodes.map(n => n.left);
    } else {
      nodes = nodes.map(n => n.right);
    }
    steps++;
    i = (i + 1) % instr.length;

    if (nodes.some(n => n.name.slice(-1) !== 'Z')) {
      for (let n of nodes) {
        if (n.name.slice(-1) === 'Z') {
          lcmMap.set(n.name, steps);
        }
      }
    }
  }
  return lowestCommonMultiple([...lcmMap.values()])
}

console.log('Part A is', partA());
console.log('Part B is', partB());

console.log('Took:', ((performance.now() - startTime) / 1000).toFixed(4), 'seconds to run');
