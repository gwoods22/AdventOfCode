from time import time

scores = {
  'X': 1,
  'Y': 2,
  'Z': 3
}

moves = {
  'rock': 'X',
  'paper': 'Y',
  'scissors': 'Z'
}

symbols = {
  'X': 'rock',
  'A': 'rock',
  'Y': 'paper',
  'B': 'paper',
  'Z': 'scissors',
  'C': 'scissors'
}

result = {
  'X': 'lose',
  'Y': 'draw',
  'Z': 'win',
}

def get_result(opp, you):
  if symbols[opp] == 'rock':
    if symbols[you] == 'rock':
      return 3
    elif symbols[you] == 'paper':
      return 6
    # scissors
    else:
      return 0

  elif symbols[opp] == 'paper':
    if symbols[you] == 'rock':
      return 0
    elif symbols[you] == 'paper':
      return 3
    # scissors
    else:
      return 6

  # scissors
  else:
    if symbols[you] == 'rock':
      return 6
    elif symbols[you] == 'paper':
      return 0
    # scissors
    else:
      return 3

def get_score(opp, res):
  if symbols[opp] == 'rock':
    if result[res] == 'lose':
      return scores[moves['scissors']]
    elif result[res] == 'draw':
      return scores[moves['rock']] + 3
    # win
    else:
      return scores[moves['paper']] + 6

  elif symbols[opp] == 'paper':
    if result[res] == 'lose':
      return scores[moves['rock']]
    elif result[res] == 'draw':
      return scores[moves['paper']] + 3
    # win
    else:
      return scores[moves['scissors']] + 6

  # scissors
  else:
    if result[res] == 'lose':
      return scores[moves['paper']]
    elif result[res] == 'draw':
      return scores[moves['scissors']] + 3
    # win
    else:
      return scores[moves['rock']] + 6

def main():
  f = open('./data/Day2.txt', 'r')

  lines = f.readlines()

  strat1 = 0
  strat2 = 0

  for line in lines:
    opp = line.split()[0]
    you = line.split()[1]
    
    strat1 += get_result(opp, you) + scores[you]

    strat2 += get_score(opp, you)

  print(f'Part 1: {strat1}')
  print(f'Part 2: {strat2}')

start_time = time()
main()
print(f'---\nTook {round(time() - start_time, 5)} seconds')