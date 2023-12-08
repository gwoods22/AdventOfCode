import { strData } from './load.js';

const startTime = performance.now();

interface HandType {
  type: string;
  value: number;
}

interface Hand {
  cards: string;
  bid: number;
  type: HandType;
}

const HandTypes: { [key: string]: HandType } = {
  FiveKind: {
    type: 'FiveKind',
    value: 6
  },
  FourKind: {
    type: 'FourKind',
    value: 5
  },
  FullHouse: {
    type: 'FullHouse',
    value: 4
  },
  ThreeKind: {
    type: 'ThreeKind',
    value: 3
  },
  TwoPair: {
    type: 'TwoPair',
    value: 2
  },
  OnePair: {
    type: 'OnePair',
    value: 1
  },
  High: {
    type: 'High',
    value: 0
  }
};

const cardMap: { [key: string]: number } = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2
};

const cardMap2: { [key: string]: number } = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1
};

const countOf = (element: string, array: string[]): number =>
  array.reduce((a, b) => {
    return b === element ? a + 1 : a;
  }, 0);

const getHandType = (cards: string[]): HandType => {
  let set = new Set<string>(cards);
  if (set.size === 1) {
    return HandTypes.FiveKind;
  } else if (set.size === 2) {
    if (countOf([...set][0], cards) === 1 || countOf([...set][1], cards) === 1) {
      return HandTypes.FourKind;
    } else {
      return HandTypes.FullHouse;
    }
  } else if (set.size === 3) {
    if (
      countOf([...set][0], cards) === 3 ||
      countOf([...set][1], cards) === 3 ||
      countOf([...set][2], cards) === 3
    ) {
      return HandTypes.ThreeKind;
    } else {
      return HandTypes.TwoPair;
    }
  } else if (set.size === 4) {
    return HandTypes.OnePair;
  } else {
    return HandTypes.High;
  }
};

const getHandType2 = (cards: string[]): HandType => {
  let set = new Set<string>(cards);
  if (set.size === 1) {
    return HandTypes.FiveKind;
  } else if (set.size === 2) {
    let [c1, c2]: string[] = [...set];
    if ([...set].includes('J')) {
      return HandTypes.FiveKind;
    } else if (countOf(c1, cards) === 1 || countOf(c2, cards) === 1) {
      return HandTypes.FourKind;
    } else {
      return HandTypes.FullHouse;
    }
  } else if (set.size === 3) {
    let [c1, c2, c3]: string[] = [...set];
    if (
      countOf(c1, cards) === 3 ||
      countOf(c2, cards) === 3 ||
      countOf(c3, cards) === 3
    ) {
      return [...set].includes('J') ? HandTypes.FourKind : HandTypes.ThreeKind;
    } else {
      if (countOf('J', cards) === 2) return HandTypes.FourKind;
      else if (countOf('J', cards) === 1) return HandTypes.FullHouse;
      else return HandTypes.TwoPair;
    }
  } else if (set.size === 4) {
    return [...set].includes('J') ? HandTypes.ThreeKind : HandTypes.OnePair;
  } else {
    return [...set].includes('J') ? HandTypes.OnePair : HandTypes.High;
  }
};

const main = (
  getType: (cards: string[]) => HandType,
  cardMap: { [key: string]: number }
) => {
  let hands: Hand[] = [];

  for (const line of strData) {
    let [cards, bid]: [string, number] = line.split(' ');
    let type: HandType = getType(cards.split(''));

    let inserted = false;
    let i = 0;
    while (!inserted && i < hands.length) {
      let hand: Hand = hands[i];

      if (hand.type.value < type.value) {
        hands.splice(i, 0, { cards, bid, type });
        inserted = true;
        break;
      } else if (hand.type.value === type.value) {
        let j = 0;
        while (!inserted && j < 5) {
          if (cardMap[hand.cards[j]] < cardMap[cards[j]]) {
            hands.splice(i, 0, { cards, bid, type });
            inserted = true;
          } else if (cardMap[hand.cards[j]] > cardMap[cards[j]]) {
            break;
          }
          j++;
        }
      }
      i++;
    }
    if (!inserted) hands.push({ cards, bid, type });
  }

  let winnings = 0;
  let i = 1;
  for (const hand of hands.reverse()) {
    winnings += hand.bid * i;
    i++;
  }
  return winnings;
};

console.log('Part A is', main(getHandType, cardMap));
console.log('Part B is', main(getHandType2, cardMap2));

console.log('Took:', ((performance.now() - startTime) / 1000).toFixed(4), 'seconds to run');
