import Parser from '../utils/dayParser';

export type GenericObj<T> = {
  game: T;
  blue: T;
  green: T;
  red: T;
};

export const regexArray: GenericObj<RegExp> = {
  game: /(?<=^Game\s)\d+/g,
  blue: /(\d+?)(?=\sblue)/g,
  red: /(\d+?)(?=\sred)/g,
  green: /(\d+?)(?=\sgreen)/g,
};

export const cubeAmountArray: number[] = [12, 13, 14];

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(2);
  const dataLine: number = data
    .split('\n')
    .filter((line: string) => line !== '')
    .map(LineDataChange)
    .filter(filterForValid)
    .map((object: GenericObj<number>) => object.game)
    .reduce((a, b) => a + b);
  console.log(dataLine);
};

export const LineDataChange = (line: string): GenericObj<number> => {
  let dataObj: GenericObj<number> = {
    game: 0,
    red: 0,
    green: 0,
    blue: 0,
  };
  Object.keys(regexArray).forEach((regex: string) => {
    if (regex === 'game') {
      dataObj[regex] = parseInt(line.match(regexArray[regex])![0]);
    }
    if (regex === 'red' || regex === 'green' || regex === 'blue') {
      dataObj[regex] = findMaxCubes(line.match(regexArray[regex]) as string[]);
    }
  });
  return dataObj;
};

const findMaxCubes = (cubeArray: string[]): number => {
  return cubeArray
    .map((cube: string) => parseInt(cube))
    .reduce((a: number, b: number) => Math.max(a, b));
};

const filterForValid = (gameObj: GenericObj<number>): boolean => {
  return gameObj.blue <= cubeAmountArray[2] &&
    gameObj.red <= cubeAmountArray[0] &&
    gameObj.green <= cubeAmountArray[1]
    ? true
    : false;
};

displaySolution();
