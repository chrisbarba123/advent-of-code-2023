import Parser from '../utils/dayParser';

type genericObj<T> = {
  game: T;
  blue: T;
  green: T;
  red: T;
};

const regexArray: genericObj<RegExp> = {
  game: /(?<=^Game\s)\d+/g,
  blue: /(\d+?)(?=\sblue)/g,
  red: /(\d+?)(?=\sred)/g,
  green: /(\d+?)(?=\sgreen)/g,
};

const cubeAmountArray: number[] = [12, 13, 14];

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(2);
  const dataLine: number = data
    .split('\n')
    .filter((line: string) => line !== '')
    .map(lineDataChange)
    .filter((gameObj) => filterForValid(gameObj))
    .map((object: genericObj<number>) => object.game)
    .reduce((a, b) => a + b);
  console.log(dataLine);
};

const lineDataChange = (line: string): genericObj<number> => {
  let dataObj: genericObj<number> = {
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

const filterForValid = (gameObj: genericObj<number>): boolean => {
  return gameObj.blue <= cubeAmountArray[2] &&
    gameObj.red <= cubeAmountArray[0] &&
    gameObj.green <= cubeAmountArray[1]
    ? true
    : false;
};

displaySolution();
