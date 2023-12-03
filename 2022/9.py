from typing import Tuple, List
from math import sqrt
from time import time

movement = {
  'R': {
    'x': 1,
    'y': 0,
  },
  'L': {
    'x': -1,
    'y': 0,
  },
  'U': {
    'x': 0,
    'y': 1,
  },
  'D': {
    'x': 0,
    'y': -1,
  }
}

class Knot:
  def __init__(self, x: int, y: int, name: any) -> None:
    self.x = x
    self.y = y
    self.name = str(name)
    self.visited = [(x,y)]

  def moveNum(self, x: int, y: int) -> None:
    self.x = self.x + x
    self.y = self.y + y
    if (self.x, self.y) not in self.visited:
      self.visited.append((self.x, self.y))

  def move(self, direction: str) -> None:
    self.x = self.x + movement[direction]['x']
    self.y = self.y + movement[direction]['y']
    if (self.x, self.y) not in self.visited:
      self.visited.append((self.x, self.y))
  
  def getX(self) -> int:
    return self.x

  def getY(self) -> int:
    return self.y

  def getName(self) -> str:
    return self.name

  def getCoords(self) -> Tuple[int,int]:
    return (self.x, self.y)

  def hasVisited(self, coor: Tuple[int,int]) -> bool:
    return coor in self.visited

  def countVisited(self) -> int:
    return len(self.visited)

def parseMovement(x) -> int:
  if x == 0:  return 0
  elif x > 0: return 1
  return -1

def distanceApart(e1: Knot, e2: Knot):
  xDiff = abs(e1.getX() - e2.getX())
  yDiff = abs(e1.getY() - e2.getY())
  if xDiff == 0:
    return yDiff
  elif yDiff == 0:
    return xDiff
  else:
    return sqrt(xDiff**2 + yDiff**2)

x = 6
y = 5
def grid(knots: List[Knot]) -> None:
  ys = list(map(lambda x: x.getY(), knots))

  for i in range(y - 1,-1,-1):
    if i in ys:
      current_y_knots = list(filter(lambda x: x.getY() == i, knots))
      current_xs = list(map(lambda x: x.getX(), current_y_knots))
      current_xs_names = list(map(lambda x: x.getName(), current_y_knots))

      for j in range(x):
        if j in current_xs:
          char = current_xs_names[current_xs.index(j)]
          print(f'{char}', end='')
        else: 
          print('.', end='')
      print()
    else:
      print('.' * x)

def part1():
  f = open('./data/Day9.txt', 'r')
  lines = f.readlines()

  head = Knot(0,0,'H')
  tail = Knot(0,0,'T')

  for line in lines:
    direction = line.split(' ')[0]
    distance = int(line.split(' ')[1])

    for i in range(distance):
      # grid([head, tail])
      head.move(direction)
      
      if distanceApart(head, tail) > 2:
        # diagonal move
        tail.moveNum(
          parseMovement(head.getX() - tail.getX()),
          parseMovement(head.getY() - tail.getY())
        )

      elif distanceApart(head, tail) > sqrt(2):
        # hor / vert move
        if head.getX() == tail.getX():
          tail.move('U' if head.getY() > tail.getY() else 'D')
        elif head.getY() == tail.getY():
          tail.move('R' if head.getX() > tail.getX() else 'L')

  print(f'Part 1: {tail.countVisited()}')

def part2():
  f = open('./data/Day9.txt', 'r')
  lines = f.readlines()

  knots = [Knot(0,0,'H')]
  for i in range(9):
    knots.append(Knot(0,0,i+1))

  for line in lines:
    direction = line.split(' ')[0]
    distance = int(line.split(' ')[1])

    for i in range(distance):
      # grid(knots)
      knots[0].move(direction)
      
      for i in range(len(knots) - 1):
        head = knots[i]
        tail = knots[i + 1]

        if distanceApart(head, tail) > 2:
          # diagonal move
          tail.moveNum(
            parseMovement(head.getX() - tail.getX()),
            parseMovement(head.getY() - tail.getY())
          )

        elif distanceApart(head, tail) > sqrt(2):
          # hor / vert move
          if head.getX() == tail.getX():
            tail.move('U' if head.getY() > tail.getY() else 'D')
          elif head.getY() == tail.getY():
            tail.move('R' if head.getX() > tail.getX() else 'L')

  print(f'Part 2: {knots[9].countVisited()}')


start_time1 = time()
part1()
print(f'---\nTook {round(time() - start_time1, 5)} seconds')
start_time2 = time()
part2()
print(f'---\nTook {round(time() - start_time2, 5)} seconds')