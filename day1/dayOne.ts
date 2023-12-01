import Parser from '../src/dayParser';

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(1);
  const dataArray: string[] = data.split('\n');
  const output: (string | null)[] = dataArray
    .map((item: string) => item.match(/[0-9]/g) as (string | null)[])
    .reduce(arrayReducer);
  console.log(output[0]);
};

const arrayReducer = (
  a: (string | null)[],
  b: (string | null)[]
): (string | null)[] => {
  const firstElement = (a as string[]) ?? ['0'];
  const secondElement = (b as string[]) ?? ['0'];
  return [
    (
      parseInt(firstElement[0] + firstElement[firstElement.length - 1]) +
      parseInt(secondElement[0] + secondElement[secondElement.length - 1])
    ).toString(),
  ];
};

displaySolution();
