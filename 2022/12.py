lines = open('./data/a.csv', 'r').readlines()
data = []

for line in lines:
  arr = list(map(lambda x : str(ord(x) - 96), line.strip().split(',')))
  data.append(','.join(arr))

open('./data/b.csv', 'w').write('\n'.join(data))
# After parsing the data into a csv file I was able to retrieve the
#  answer in Excel using conditional highlighting which made it easy
#  to manually find the answer.
# Today was Advent of excel insted of advent of code 🙈

# open('./data/b.csv','w').write('\n'.join( list(map(lambda line : ','.join(list(map(lambda x : str(ord(x)-96), line.strip().split(',')))), open('./data/a.csv','r').readlines())) ))