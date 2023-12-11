import Parser from '../utils/dayParser';

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(9);
  //   const data: string = '0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45';
  const dataSplit: number[][] = data
    .split('\n')
    .filter((line: string) => line !== '')
    .map((line: string) =>
      line.split(' ').map((number: string) => parseInt(number))
    );
  let answer: number = 0;
  for (let line of dataSplit) {
    answer += findNextPrediction(line);
  }
  console.log(answer);
};

const findNextPrediction = (line: number[]): number => {
  console.log(line);
  const difference: number[] = [];
  let idx: number = 0;
  while (idx !== line.length - 1) {
    difference.push(line[idx + 1] - line[idx]);
    idx++;
  }
  console.log(difference);
  if (difference.every((number: number) => number === 0)) {
    return line[0];
  }
  return line[0] - findNextPrediction(difference);
};

displaySolution();
