import Parser from '../utils/dayParser';

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(3);
  const regexInline: RegExp = /(?<=[^.0-9])\d{1,3}|\d{1,3}(?=[^.0-9])/g;
  const regexAllNumbers: RegExp = /\d{1,3}/g;
  let fullSum: number = 0;
  let numberArray: string[] = data
    .match(regexAllNumbers)
    ?.filter((number: string | null) => number !== '') as string[];
  const numberInlineWithSymbol: string[] = data.match(regexInline) as string[];
  numberArray = numberArray.filter(
    (number: string) => !numberInlineWithSymbol.includes(number)
  );

  numberInlineWithSymbol.forEach((number: string) => {});

  const allNumbers: string[] = data.match(/\d{1,3}/g) as string[];
  console.log(allNumbers);
};

displaySolution();

// data.split('\n').forEach((line : string) => {
//   const numAndSymbol : string[] =
// });
