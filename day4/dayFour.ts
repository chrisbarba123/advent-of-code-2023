import Parser from '../utils/dayParser';

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(4);
  const lines: string[] = data
    .split('\n')
    .filter((line: string) => line !== '')
    .map((line: string) => line.split(':')[1]);

  let winningNumbers: number[][] = [];
  let drawNumbers: number[][] = [];

  let sum: number = 0;

  lines.forEach((line: string) => {
    winningNumbers.push(createArrays(true, line));
    drawNumbers.push(createArrays(false, line));
  });

  for (let i: number = 0; i < winningNumbers.length; i++) {
    const response = drawNumbers[i].filter((draw: number) =>
      winningNumbers[i].includes(draw)
    );
    sum += calculatePoints(response);
  }

  console.log(sum);
};

const createArrays = (winning: boolean, data: string): number[] => {
  const idx: number = winning ? 0 : 1;
  return data
    .split('|')
    [idx].match(/\d+/g)
    ?.map((number: string) => parseInt(number)) as number[];
};

const calculatePoints = (draw: number[]): number => {
  return draw.length - 1 > -1 ? Math.pow(2, draw.length - 1) : 0;
};

displaySolution();
