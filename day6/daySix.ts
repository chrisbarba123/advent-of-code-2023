import Parser from '../utils/dayParser';

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(6);
  const timeAndDistance = rearrangeData(data);
  let answer = 1;
  timeAndDistance.forEach((element: number[]) => {
    answer *= beatsRecord(element[0], element[1]);
  });
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

const rearrangeData = (data: string): number[][] => {
  let numbers = data.match(/\d+/g)!.map((number: string) => parseInt(number));
  let arrangedData: number[][] = [];
  for (let i: number = 0; i < numbers.length / 2; i++) {
    arrangedData.push([numbers[i], numbers[i + numbers.length / 2]]);
  }
  return arrangedData;
};

displaySolution();
