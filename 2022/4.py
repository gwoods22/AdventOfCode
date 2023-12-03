from time import time 

def main():
  f = open('./data/Day4.txt', 'r')
  lines = f.readlines()

  insideCount = 0
  overlapCount = 0

  for line in lines:
    elf1 = list(map(int, line.split(',')[0].split('-') ))
    elf2 = list(map(int, line.split(',')[1].split('-') ))
    
    if elf1[0] <= elf2[0] and elf1[1] >= elf2[1]:
      insideCount += 1
    elif elf2[0] <= elf1[0] and elf2[1] >= elf1[1]:
      insideCount += 1

    if elf1[1] < elf2[0] or elf2[1] < elf1[0]:
      overlapCount += 1

  print(f'Part 1: {insideCount}')
  print(f'Part 2: {len(lines) - overlapCount}')

start_time = time()
main()
print(f'---\nTook {round(time() - start_time, 5)} seconds')