import Parser from '../utils/dayParser';

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

const numObjStringReverse: {
  [key: string]: string;
} = {
  eno: '1',
  owt: '2',
  eerht: '3',
  ruof: '4',
  evif: '5',
  xis: '6',
  neves: '7',
  thgie: '8',
  enin: '9',
};

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(1);
  const dataSplit: string[] = data.split('\n');
  const dataSplitReverse: string[] = dataSplit.map((item) =>
    item.split('').reverse().join('')
  );
  const regex: RegExp = /one|two|three|four|five|six|seven|eight|nine|\d/g;
  const regexReverse: RegExp =
    /eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d/g;

  let first = regexFilter(regex, dataSplit, numObjString);
  let last = regexFilter(regexReverse, dataSplitReverse, numObjStringReverse);
  let concatArray = [];
  for (let i: number = 0; i < first.length; i++) {
    let num = first[i] + last[i];
    concatArray.push(num);
  }
  console.log(
    concatArray.reduce((a, b) => (parseInt(a) + parseInt(b)).toString())
  );
};

const regexFilter = (
  regex: RegExp,
  data: string[],
  numObj: { [key: string]: string }
) => {
  const response = data
    .map((item) => item.match(regex))
    .filter((item) => item !== null)
    .map((item) => toIntegerString(item![0], numObj));
  return response;
};

const toIntegerString = (
  intStr: string,
  numObj: { [key: string]: string }
): string => {
  if (Object.keys(numObj).includes(intStr!)) {
    return numObj[intStr!];
  }
  return intStr as string;
};

displaySolution();
