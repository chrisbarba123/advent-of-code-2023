import Parser from '../utils/dayParser';
import { Numbers } from '../utils/numberEnum';

const numObjString: {
  [key: string]: string;
} = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(1);
  const dataSplit: string[] = data.split('\n');
  const regex: RegExp = /one|two|three|four|five|six|seven|eight|nine|[0-9]/g;
  const output = dataSplit
    .map((item) => item.match(regex) as (string | null)[])
    .filter((item) => item !== null)
    .map(mapperData)
    .reduce((a, b) => parseInt(a! + parseInt(b!)).toString());
  console.log(output);
};

const mapperData = (item: (string | null)[]): string | undefined => {
  const length = item.length;
  const elementOne = item[0];
  const elementTwo = item[length - 1];
  return toIntegerString(elementOne).concat(toIntegerString(elementTwo));
};

const toIntegerString = (intStr: string | null): string => {
  if (intStr === 'string' && Object.keys(numObjString).includes(intStr)) {
    return numObjString[intStr];
  }
  return intStr as string;
};

displaySolution();
