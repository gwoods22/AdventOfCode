from re import sub, split
from time import time

def main():
  f = open('./data/Day5.txt', 'r')

  lines = f.readlines()

  parsedStacks = False

  numStacks = len(sub(r'\s|\[|\]','',lines[0].replace('    ','-')))
  stacks1 = [[] for i in range(numStacks)]
  stacks2 = [[] for i in range(numStacks)]

  for line in lines:
    if line[0:3] == ' 1 ' or line == '\n':
      parsedStacks = True

    elif parsedStacks:
      instructions = list(map(int, split(r' from | to ', line.strip()[5:])))
      a = instructions[1] - 1
      b = instructions[2] - 1

      moving = []

      for x in range(instructions[0]):
        stacks1[b].append(stacks1[a].pop())
        
        moving.insert(0, stacks2[a].pop())
      
      stacks2[b].extend(moving)
      
    else:
      row = sub(r'\s|\[|\]','',line.replace('    ','-'))
      for (i,x) in enumerate(row):
        if x != '-':
          stacks1[i].insert(0, x)
          stacks2[i].insert(0, x)




  tops1 = ''.join(list(map(lambda x : x[-1], stacks1)))
  tops2 = ''.join(list(map(lambda x : x[-1], stacks2)))

  print(f'Part 1: {tops1}')
  print(f'Part 2: {tops2}')

start_time = time()
main()
print(f'---\nTook {round(time() - start_time, 5)} seconds')