import Parser from '../utils/dayParser';

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(4);
  //   const data: string =
  //     'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11';
  const lines: string[] = data
    .split('\n')
    .filter((line: string) => line !== '')
    .map((line: string) => line.split(':')[1]);

  let winningNumbers: number[][] = [];
  let drawNumbers: number[][] = [];
  let cardCopies: number[][] = [];

  lines.forEach((line: string) => {
    winningNumbers.push(createArrays(true, line));
    drawNumbers.push(createArrays(false, line));
  });

  for (let i: number = 0; i < winningNumbers.length; i++) {
    const matchDraw = drawNumbers[i].filter((draw: number) =>
      winningNumbers[i].includes(draw)
    );
    cardCopies.push(findCopies(matchDraw.length, i));
  }

  let checker: number[] = Array(cardCopies.length).fill(0);
  let sum: number = 0;
  for (let i: number = 1; i < cardCopies.length + 1; i++) {
    findSum(i, cardCopies, checker);
  }
  console.log(checker.reduce((a: number, b: number) => a + b));
  console.table(checker);
};

const findSum = (idx: number, copies: number[][], checker: number[]): void => {
  checker[idx - 1] += 1;
  copies[idx - 1].forEach((card: number) => {
    findSum(card, copies, checker);
  });
};

const createArrays = (winning: boolean, data: string): number[] => {
  const idx: number = winning ? 0 : 1;
  return data
    .split('|')
    [idx].match(/\d+/g)
    ?.map((number: string) => parseInt(number)) as number[];
};

const findCopies = (copyLength: number, idx: number): number[] => {
  let copies: number[] = [];
  for (let j: number = idx + 2; j < idx + copyLength + 2; j++) {
    copies.push(j);
  }
  return copies;
};
displaySolution();
