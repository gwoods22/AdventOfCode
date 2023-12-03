from time import time

def main() -> None:
  f = open('./data/Day8.txt', 'r')

  lines = f.readlines()

  for line in lines:
    pass

  print(f'Part 1: {0}')
  # print(f'Part 2: {0}')

start_time = time()
main()
print(f'---\nTook {round(time() - start_time, 5)} seconds')