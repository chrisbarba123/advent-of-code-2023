import Parser from '../utils/dayParser';

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(1);
  const dataArray: string[] = data.split('\n');
  console.dir(
    dataArray
      .map((item: string) => item.match(/[0-9]/g) as (string | null)[])
      .filter((x) => x !== null)
      .map(mapperData)
      .reduce((a, b) => (parseInt(a!) + parseInt(b!)).toString()),
    { maxArrayLength: null }
  );
};

const mapperData = (item: (string | null)[]): string | undefined => {
  const length = item.length ?? 0;
  const elementOne = item[0];
  const elementTwo = item[length - 1];
  if (typeof elementOne === 'string' && typeof elementTwo === 'string') {
    return elementOne.concat(elementTwo);
  }
  return undefined;
};

displaySolution();
