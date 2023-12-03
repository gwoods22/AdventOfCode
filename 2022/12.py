lines = open('./data/a.csv', 'r').readlines()
data = []

for line in lines:
  arr = list(map(lambda x : str(ord(x) - 96), line.strip().split(',')))
  data.append(','.join(arr))

open('./data/b.csv', 'w').write('\n'.join(data))

# open('./data/b.csv','w').write('\n'.join( list(map(lambda line : ','.join(list(map(lambda x : str(ord(x)-96), line.strip().split(',')))), open('./data/a.csv','r').readlines())) ))