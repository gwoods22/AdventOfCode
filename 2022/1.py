from time import time
def main():
  f = open('./data/Day1.txt', 'r')

  lines = f.readlines()
    
  elves = []
  currentElf = 0

  for line in lines:
    if line.strip() != '':
        currentElf += int(line.strip())
    else:
      elves.append(currentElf)
      currentElf = 0

  elves.sort()

  print(f'Part 1: {elves[-1]}')
  print(f'Part 2: {elves[-1] + elves[-2] + elves[-3]}')

start_time = time()
main()
print(f'---\nTook {round(time() - start_time, 5)} seconds')