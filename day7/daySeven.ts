import Parser from '../utils/dayParser';

const cardStrength = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
];

let cardGroups: string[][][] = [[], [], [], [], [], [], []];

const handType = (hand: string): number => {
  let cards = hand.split('');
  let checkForType: string[][] = [];
  while (cards.length !== 0) {
    const regex = new RegExp(cards[0], 'g');
    checkForType.push(hand.match(regex) as string[]);
    cards = cards.filter((otherCards: string) => otherCards !== cards[0]);
  }
  let number = 0;
  if (checkForType.length === 4) return 1;
  if (checkForType.length === 3) {
    for (let type of checkForType) {
      if (type.length === 2) return 2;
      if (type.length === 3) return 3;
    }
  }

  if (checkForType.length === 2) {
    for (let type of checkForType) {
      if (type.length === 3) return 4;
      if (type.length === 4) return 5;
    }
  }
  if (checkForType.length === 1) return 6;
  return number;
};

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(7);
  let bids: string[][] = data
    .split('\n')
    .filter((line: string) => line !== '')
    .map((line: string) => line.split(' '));

  for (let hand of bids) {
    const type = handType(hand[0]);
    cardGroups[type].push(hand);
  }

  for (let group of cardGroups) {
    group.sort(sortType);
  }

  let sortedBids = [];

  for (let group of cardGroups) {
    for (let bid of group) {
      sortedBids.push(bid);
    }
  }

  const answer = sortedBids
    .map((bid: string[], index: number) => parseInt(bid[1]) * (index + 1))
    .reduce((a: number, b: number) => a + b);

  console.dir(sortedBids, { maxArrayLength: null });
  console.log(answer);
};

const sortType = (bidA: string[], bidB: string[]) => {
  let strength = 1;
  for (let i: number = 0; i < bidA[0].length; i++) {
    if (bidA[0][i] === bidB[0][i]) {
      continue;
    } else {
      cardStrength.indexOf(bidA[0][i]) > cardStrength.indexOf(bidB[0][i])
        ? (strength = 1)
        : (strength = -1);
      break;
    }
  }
  return strength;
};
displaySolution();
