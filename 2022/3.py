import time


def priority(char):
  if char.islower():
    return ord(char) - 96
  else:
    return ord(char) - 38


def main():
  f = open('./data/Day3.txt', 'r')

  lines = f.readlines()

  total1 = 0
  total2 = 0

  group = []

  for line in lines:
    mid = len(line.strip()) // 2
    front = line[:mid]
    back = line[mid:]

    for item in front:
      if item in back:
        total1 += priority(item)
        break

    if len(group) < 2:
      group.append(line)
    else:
      for item in line:
        if item in group[0]:
          if item in group[1]:
            total2 += priority(item)
            group = []
            break

  print(f'Part 1: {total1}')
  print(f'Part 2: {total2}')


start_time = time.time()
main()
print(f'---\nTook {round(time.time() - start_time, 5)} seconds')
