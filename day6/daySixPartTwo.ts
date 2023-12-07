import Parser from '../utils/dayParser';

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(6);
  const timeAndDistance = rearrangeData(data);
  let answer = 1;
  answer *= beatsRecord(timeAndDistance[0], timeAndDistance[1]);
  console.log(answer);
};

const beatsRecord = (time: number, distance: number): number => {
  let success: number = 0;
  for (let i: number = 0; i < time; i++) {
    const timeLeft = time - i;
    if (timeLeft * i > distance) success++;
  }
  return success;
};

const rearrangeData = (data: string): number[] => {
  let numbers = data
    .split('\n')
    .filter((line: string) => line !== '')
    .map((line: string) => line.match(/\d+/g) as string[])
    .map((number: string[]) =>
      number.reduce((a: string, b: string) => a.concat(b))
    );
  let arrangedData: number[] = [parseInt(numbers[0]), parseInt(numbers[1])];
  return arrangedData;
};

displaySolution();
