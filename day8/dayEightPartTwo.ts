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
  console.dir(structuredDirection, { maxArrayLength: null });

  //   console.log(findLocation(instructions, structuredDirection));
  const endWithA = structuredDirection.filter((direction: directions) =>
    /A$/.test(direction.address)
  );

  findLCM(endWithA, instructions, structuredDirection);
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

const primeFactors = (steps: number): number[] => {
  console.log(steps, 'in prime factors');
  let primeFactors: number[] = [];
  while (steps % 2 == 0) {
    primeFactors.push(2);
    steps = Math.floor(steps / 2);
  }
  for (let i = 3; i <= Math.floor(Math.sqrt(steps)); i = i + 2) {
    while (steps % i == 0) {
      primeFactors.push(i);
      steps = Math.floor(steps / i);
    }
  }
  if (steps > 2) primeFactors.push(steps);

  return primeFactors;
};

const findLCM = (
  allA: Array<directions>,
  instructions: string[],
  directions: Array<directions>
): number => {
  const primes = allA.map((address: directions) =>
    primeFactors(findLocation(instructions, directions, address))
  );
  console.log(primes);
  return 0;
};

const findLocation = (
  instructions: string[],
  directions: directions[],
  currentAddress: { [key: string]: string } = directions[0]
): number => {
  let steps = 0;

  while (/Z$/.test(currentAddress.address) !== true) {
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
