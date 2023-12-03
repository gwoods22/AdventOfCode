from time import time

def main(msg_length: int) -> int:
  f = open('./data/Day6.txt', 'r')

  lines = f.readlines()

  string = lines[0]
  print(len(string))
  for i in range(len(string) - msg_length):
    test = string[i:i + msg_length]
    doesPass = True
    for c in test:
      if test.count(c) > 1:
        doesPass = False
    if doesPass:
      return i + msg_length

start_time = time()
print(f'Part 1: {main(4)}')
print(f'Part 2: {main(14)}')
print(f'---\nTook {round(time() - start_time, 5)} seconds')    