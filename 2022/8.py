from time import time

def main() -> None:
  f = open('./data/Day8.txt', 'r')

  lines = f.readlines()
  X = len(lines[0].strip())
  Y = len(lines)

  trees = []

  for (i, line) in enumerate(lines):
    trees.append([])
    for c in line.strip():
      trees[i].append(int(c))

  part1 = 0
  part2 = 0

  i, j = 3, 2
  for i in range(1, Y-1):
    for j in range(1, X-1):
      above = list(map(lambda x : x[j],trees))[:i]
      right = list(trees[i][j+1:])
      below = list(map(lambda x : x[j],trees))[i+1:]
      left = list(trees[i][:j])

      above.reverse()
      left.reverse()

      if trees[i][j] <= min(max(above), max(right), max(below), max(left)):
        part1 += 1

      c_above = 0
      for x in above:
        c_above += 1
        if x >= trees[i][j]:
          break

      c_right = 0
      for x in right:
        c_right += 1
        if x >= trees[i][j]:
          break

      c_below = 0
      for x in below:
        c_below += 1
        if x >= trees[i][j]:
          break

      c_left = 0
      for x in left:
        c_left += 1
        if x >= trees[i][j]:
          break

      scenic = c_above * c_right * c_below * c_left
      if scenic > part2:
        part2 = scenic
  


  print(f'Part 1: {X*Y - part1}')
  print(f'Part 2: {part2}')

start_time = time()
main()
print(f'---\nTook {round(time() - start_time, 5)} seconds')
