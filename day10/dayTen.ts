import Parser from '../utils/dayParser';

const coordinate = class {
  x: number;
  y: number;
  directions: { [key: string]: { [key: string]: boolean } };
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.directions = {
      north: { F: true, '7': true, '|': true },
      east: { '-': true, J: true, '7': true },
      south: { '|': true, L: true, J: true },
      west: { '-': true, L: true, F: true },
    };
  }
  north = () => {
    this.y = this.y + 1;
  };

  east = () => {
    this.x++;
  };
  south = () => {
    this.y--;
  };
  west = () => {
    this.x--;
  };

  change = {
    north: this.north(),
    east: this.east(),
    south: this.south(),
    west: this.west(),
  };
};

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(10);
  const pipe: string[][] = data
    .split('\n')
    .filter((line: string) => line !== '')
    .map((line: string) => line.split(''));
  const start = findStartPoint(pipe);
  start.north;
  console.log(start.x, start.y, ' something');
  //   const farthestPoint = findFarthestPoint(start, pipe);
  //   console.log(farthestPoint);
};

const findStartPoint = (data: string[][]) => {
  let yIdx = 0;
  let xIdx = 0;

  while (xIdx === 0) {
    console.log(xIdx);
    const match = data[yIdx].indexOf('S');
    xIdx = match !== -1 ? match : 0;
    yIdx++;
  }
  return new coordinate(xIdx, yIdx - 1);
};

const findFarthestPoint = (start: any, pipe: string[][]): number => {
  console.log(start.x, start.y);
  const startCoordinate = start;
  let point = startCoordinate; //current point
  let step = 0; //how many steps
  while (pipe[point.y][point.x] !== 'S' || step === 0) {
    console.log(point.x, point.y);
    for (const direction of Object.keys(point.directions)) {
      let tempDirection = point;
      console.log(direction);
      tempDirection.north;
      console.log(
        pipe[tempDirection.y][tempDirection.x],
        ' ',
        tempDirection.x,
        tempDirection.y
      );
      if (
        tempDirection.directions[pipe[tempDirection.y][tempDirection.x]] ===
        true
      ) {
        pipe[point.y][point.x] = '.';
        console.log(direction);
        point.change[direction];
        console.log(point.x, point.y);
        break;
      }
    }
    console.log(
      pipe[point.y - 1].join('') +
        '\n' +
        pipe[point.y].join('') +
        '\n' +
        pipe[point.y + 1].join('')
    );
    step++;
  }
  return step / 2;
};

displaySolution();
