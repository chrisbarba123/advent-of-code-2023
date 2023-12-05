import Parser from '../utils/dayParser';

type symbolAdjacent = {
  before?: string;
  after?: string;
  under?: string;
  above?: string;
};

const dotLength: string[] = ['.', '..', '...'];

const inlineBefore: RegExp = /\d+$/;
const inlineAfter: RegExp = /^\d+/;
const underAndAbove: RegExp = /\d{1,3}/g;
const lineChecker: RegExp = /\d+/;

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(3);
  const dataLine: string[] = data
    .split('\n')
    .filter((line: string) => line !== '');

  let fullSum: number = 0;

  for (let i: number = 0; i < dataLine.length; i++) {
    let tmpLine = dataLine[i];
    let gearIndex: number[] = [];
    let gears: boolean = true;

    do {
      let idx = tmpLine.indexOf('*');
      if (idx === -1) {
        gears = false;
        break;
      }
      tmpLine = tmpLine.replace('*', '.');
      gearIndex.push(idx);
    } while (gears === true);

    gearIndex.forEach((gear: number) => {
      let connections: number[] = [];

      const before =
        dataLine[i].substring(0, gear).match(inlineBefore) ?? false;

      const after =
        dataLine[i]
          .substring(gear + 1, dataLine[i].length)
          .match(inlineAfter) ?? false;

      //pushing connections before *
      if (typeof before === 'object') {
        connections.push(parseInt(before[0]));
      }
      if (typeof after === 'object') {
        connections.push(parseInt(after[0]));
      }

      if (i - 1 !== -1) {
        const above =
          (dataLine[i - 1]
            .substring(gear - 3, gear + 4)
            .match(underAndAbove) as string[]) ?? false;
        if (
          typeof above === 'object' &&
          /\d{3}/.test(dataLine[i - 1].substring(gear - 1, gear + 2))
        ) {
          connections.push(
            parseInt(dataLine[i - 1].substring(gear - 1, gear + 2))
          );
        } else {
          if (typeof above === 'object') {
            if (above.length === 2) {
              const test = /\d\.\d/.test(
                dataLine[i - 1].substring(gear - 1, gear + 2)
              );
              if (test) {
                connections.push(parseInt(above[0]));
                connections.push(parseInt(above[1]));
              } else {
                const finder = /\d+/;
                const first = finder.test(
                  dataLine[i - 1].substring(gear - 1, gear + 1)
                )
                  ? dataLine[i - 1]
                      .substring(gear - 1, gear + 1)
                      .match(finder)![0].length
                  : 0;
                const second = finder.test(
                  dataLine[i - 1].substring(gear, gear + 2)
                )
                  ? dataLine[i - 1].substring(gear, gear + 2).match(finder)![0]
                      .length
                  : 0;
                if (first > second) {
                  connections.push(
                    parseInt(
                      dataLine[i - 1]
                        .substring(gear - 3, gear)
                        .match(/\d{1,2}(\d|\.)$/)![0]
                        .replace('.', '') as string
                    )
                  );
                } else {
                  console.log(
                    dataLine[i - 1]
                      .substring(gear + 1, gear + 4)
                      .match(/^(\d|\.)\d{1,2}/)![0]
                      .replace('.', '') as string
                  );
                  connections.push(
                    parseInt(
                      dataLine[i - 1]
                        .substring(gear + 1, gear + 4)
                        .match(/^(\d|\.)\d{1,2}/)![0]
                        .replace('.', '') as string
                    )
                  );
                }
              }
            } else {
              if (
                lineChecker.test(dataLine[i - 1].substring(gear - 1, gear + 2))
              ) {
                connections.push(parseInt(above[0]));
              }
            }
          }
        }

        console.log(dataLine[i - 1].substring(gear - 3, gear + 4));
      }

      console.log(dataLine[i].substring(gear - 3, gear + 4));

      if (i + 1 !== dataLine.length) {
        const under =
          (dataLine[i + 1]
            .substring(gear - 3, gear + 4)
            .match(underAndAbove) as string[]) ?? false;
        if (
          typeof under === 'object' &&
          /\d{3}/.test(dataLine[i + 1].substring(gear - 1, gear + 2))
        ) {
          connections.push(
            parseInt(dataLine[i + 1].substring(gear - 1, gear + 2))
          );
        } else {
          if (typeof under === 'object') {
            if (under.length === 2) {
              const test = /\d\.\d/.test(
                dataLine[i + 1].substring(gear - 1, gear + 2)
              );
              if (test) {
                connections.push(parseInt(under[0]));
                connections.push(parseInt(under[1]));
              } else {
                const finder = /\d+/;
                const first = finder.test(
                  dataLine[i + 1].substring(gear - 1, gear + 1)
                )
                  ? dataLine[i + 1]
                      .substring(gear - 1, gear + 1)
                      .match(finder)![0].length
                  : 0;
                const second = finder.test(
                  dataLine[i + 1].substring(gear, gear + 2)
                )
                  ? dataLine[i + 1].substring(gear, gear + 2).match(finder)![0]
                      .length
                  : 0;
                if (first > second) {
                  connections.push(parseInt(under[0]));
                } else {
                  connections.push(parseInt(under[1]));
                }
              }
            } else {
              if (
                lineChecker.test(dataLine[i + 1].substring(gear - 1, gear + 2))
              ) {
                connections.push(parseInt(under[0]));
              }
            }
          }
        }
        console.log(dataLine[i + 1].substring(gear - 3, gear + 4));
        console.log('connections', connections, 'line ', i, 'idx ', gear);
      }
      if (connections.length === 2) {
        console.log(connections);
        let gearRatio = connections[0] * connections[1];
        fullSum += gearRatio;
      }
    });
  }

  console.log(fullSum);
};

const checkInline = (line: string, idx: number) => {};

const checkAboveOrBelowLine = (line: string, idx: number) => {};

displaySolution();
