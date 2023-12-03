from time import time
from typing import List
from json import loads, dumps

from functools import cmp_to_key

def parsePacket(packet: str) -> List[any]:
  s = packet
  i,j = 0, len(packet)
  while '[' in s or ']' in s:
    if '[' in s:
      i += 1
    if ']' in s:
      j -=1
    s = packet[i:j]
  
  insert = list(map(lambda x : int(x), s.split(',')))
  packet.replace(s,'-')

  while i != 1 and j != len(packet) - 1:
    while '[' not in s or ']' not in s:
      if '[' not in s:
        i -= 1
      if ']' not in s:
        j +=1
      s = packet[i:j]

    arr = s.split(',')
    arr[arr.index('-')] = insert
    insert = arr

  print(insert)
  
def inOrder(p1: List, p2: List) -> bool:
  loop = max(len(p1), len(p2))
  for i in range(loop):
    if i + 1 > len(p2): return False
    if i + 1 > len(p1): return True

    if type(p1[i]) is list or type(p2[i]) is list:
      if type(p2[i]) is not list:
        p2[i] = [p2[i]]          
      if type(p1[i]) is not list:
        p1[i] = [p1[i]]
      
      if inOrder(p1[i], p2[i]) is None:
         return inOrder(p1[i+1:], p2[i+1:])

      return inOrder(p1[i], p2[i])

    else:
      if p1[i] > p2[i]: return False
      if p1[i] < p2[i]: return True

def compare(a, b):
  if inOrder(a,b): return -1
  return 1

def main() -> None:
  start_time = time()

  f = open('./data/Day13.txt', 'r')

  lines = f.readlines()

  count = 0
  pair = 1

  for i in range(0,len(lines), 3):
    p1 = loads(lines[i].strip())
    p2 = loads(lines[i+1].strip())
    if inOrder(p1, p2):
      count += pair
    pair += 1
        
  print(f'Part 1: {count}')

  packetLines = [loads(line.strip()) for line in lines if line != '\n']
  packetLines.extend([ [[2]], [[6]] ])

  sortedLines = sorted(packetLines, key=cmp_to_key(compare))

  open('test.txt', 'w').write('\n'.join(list(map(lambda x : dumps(x), sortedLines))))

  div1 = sortedLines.index([[[[2]]]]) + 1
  div2 = sortedLines.index([[[[6]]]]) + 1

  print(f'Part 2: {div1 * div2}')
  print(f'---\nTook {round(time() - start_time, 5)} seconds')

main()
