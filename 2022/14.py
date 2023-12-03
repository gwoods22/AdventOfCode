from time import time

class Cave:
  def __init__(self, xDim, yDim, x_offset):
    self.data = [[ '.' for x in range(xDim)] for y in range(yDim)]
    self.x_offset = x_offset

  def set(self, x, y, val):
    self.data[y][x - self.x_offset] = val

  def print(self):
    print('\n'.join(list(map(lambda x : ''.join(x), self.data))))

  def canDrop(self, i, j) -> bool:
    # if i < 0 or i > 
    return self.data[i+1][j] is '.' or \
           self.data[i+1][j-1] is '.' or \
           self.data[i+1][j+1] is '.'
  

  def placeSand(self):
    i = 0
    j = 500 - self.x_offset

    while self.canDrop(i, j):
      # bottom and wall checks

      if self.data[i+1][j] is '.':
        i += 1
      elif self.data[i+1][j-1] is '.':
        i += 1
        j -= 1
      elif self.data[i+1][j+1] is '.':
        i += 1
        j += 1
      
    
    # self.data[i][j] = 'o'


def main() -> None:
  f = open('./data/Day14.txt', 'r')

  lines = f.readlines()

  # x: 457 - 541
  # y: 13 - 168
  cave = Cave(
    503 - 493,
    10,
    494
    # 541 - 456,
    # 169,
    # 457
  )

  for line in lines:
    points = line.split(' -> ')
    for i in range(len(points) - 1):
      a = list(map(int, points[ i ].split(',')))
      b = list(map(int, points[i+1].split(',')))

      if a[0] == b[0]:
        # vert
        for j in range(a[1], b[1], 1 if a[1] < b[1] else -1):
          cave.set(a[0], j, '#')
      else:
        # horz
        if a[0] < b[0]:
          for j in range(a[0], b[0]):
            cave.set(j, a[1], '#')
        else:
          for j in range(a[0], b[0] - 1, -1):
            cave.set(j, a[1], '#')
  
  # while cave.sandIsPouring()


  cave.placeSand()
  
  cave.print()

  print(f'Part 1: {0}')
  # print(f'Part 2: {0}')

start_time = time()
main()
print(f'---\nTook {round(time() - start_time, 5)} seconds')