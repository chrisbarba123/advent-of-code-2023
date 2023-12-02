import Parser from '../utils/dayParser';
import { LineDataChange, GenericObj } from './dayTwo';

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(2);
  const dataLine: number = data
    .split('\n')
    .filter((line: string) => line !== '')
    .map(LineDataChange)
    .map(findPowerOfGames)
    .reduce((a: number, b: number) => a + b);
  console.log(dataLine);
};

const findPowerOfGames = (gameObj: GenericObj<number>): number => {
  return gameObj.blue * gameObj.green * gameObj.red;
};

displaySolution();
