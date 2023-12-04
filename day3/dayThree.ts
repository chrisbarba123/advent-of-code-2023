import Parser from '../utils/dayParser';

const dotLength: string[] = ['.', '..', '...'];

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(3);
  const dataLine: string[] = data
    .split('\n')
    .filter((line: string) => line !== '');
  const regexAllNumbers: RegExp = /\d{1,3}/g;
  const symbolRegex: RegExp = /[^.0-9]/;
  let fullSum: number = 0;
  let lineMatch: string[][] = [];

  for (let i: number = 0; i < dataLine.length; i++) {
    lineMatch.push(dataLine[i].match(regexAllNumbers) as string[]);
    let line = dataLine[i];
    for (let j: number = 0; j < lineMatch[i].length; j++) {
      let regexInline: RegExp = new RegExp(
        '(?<=[^.0-9])' + lineMatch[i][j] + '|' + lineMatch[i][j] + '(?=[^.0-9])'
      );
      const idx: number = line.indexOf(lineMatch[i][j]);
      console.log(dataLine[i].substring(idx, idx + lineMatch[i][j].length));
      const test: boolean = regexInline.test(dataLine[i]);
      line = line.replace(
        lineMatch[i][j],
        dotLength[lineMatch[i][j].length - 1]
      );
      if (test) {
        fullSum += parseInt(lineMatch[i][j]);
        continue;
      }
      if (i - 1 !== -1) {
        const beforeTest: boolean = symbolRegex.test(
          dataLine[i - 1].substring(
            Math.max(0, idx - 1),
            Math.min(idx + lineMatch[i][j].length + 1, dataLine[i].length - 1)
          )
        );
        if (beforeTest) {
          fullSum += parseInt(lineMatch[i][j]);
          continue;
        }
      }
      if (i + 1 !== dataLine.length) {
        const afterTest: boolean = symbolRegex.test(
          dataLine[i + 1].substring(
            Math.max(0, idx - 1),
            Math.min(idx + lineMatch[i][j].length + 1, dataLine[i].length - 1)
          )
        );
        if (afterTest) {
          fullSum += parseInt(lineMatch[i][j]);
          continue;
        }
      }
    }
  }

  console.log(fullSum);
};

displaySolution();
