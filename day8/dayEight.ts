import Parser from '../utils/dayParser';

type directions = {
  address: string;
  left: string;
  right: string;
};

const displaySolution = async (): Promise<void> => {
  const data = await Parser(8);
  const instructions = data.split('\n\n')[0].split('');
  const directions = data
    .split('\n\n')[1]
    .split('\n')
    .filter((line: string) => line !== '');

  let structuredDirection: Array<directions> = [];

  for (let direction of directions)
    structuredDirection.push(parseDirections(direction));

  structuredDirection.sort(sortAddress);

  console.log(findLocation(instructions, structuredDirection));
};

const parseDirections = (direction: string): directions => {
  let directionObject: directions = {
    address: '',
    left: '',
    right: '',
  };
  //   console.log(direction, direction.match(/^\w+/));
  directionObject.address = direction.match(/^\w+/)![0] as string;
  directionObject.left = direction.match(/(?<=\()\w{3}/)![0] as string;
  directionObject.right = direction.match(/\w{3}(?=\))/)![0] as string;

  return directionObject;
};

const sortAddress = (a: directions, b: directions) => {
  return a.address.localeCompare(b.address);
};

const findLocation = (
  instructions: string[],
  directions: directions[],
  currentAddress: { [key: string]: string } = directions[0]
): number => {
  let steps = 0;

  while (currentAddress.address !== 'ZZZ') {
    let idx = steps % instructions.length;
    let leftOrRight = instructions[idx] === 'L' ? 'left' : 'right';
    currentAddress = directions.find(
      (direction: directions) =>
        direction.address === currentAddress[leftOrRight]
    )!;
    steps++;
  }
  return steps;
};

displaySolution();
