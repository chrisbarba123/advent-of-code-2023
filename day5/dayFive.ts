import Parser from '../utils/dayParser';

const mapTables: number[][][] = [];

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(5);
  const seeds: number[] = data
    .match(/(?<=seeds:\s)[0-9 ]*/)![0]
    .split(' ')
    .map((number: string) => parseInt(number));

  for (let i: number = 0; i < 7; i++) {
    mapTables.push(createMapTables(i, data));
  }

  const location = seeds.map((seed: number): number => findMap(seed));
  console.log(Math.min(...location), 'ANSWER');
};

const createMapTables = (idx: number, data: string): number[][] => {
  const mapRegex: RegExp[][] = [
    [/(?<=seed-to-soil map):/, /soil-to-fertilizer/],
    [/(?<=soil-to-fertilizer map):/, /fertilizer-to-water/],
    [/(?<=fertilizer-to-water map):/, /water-to-light/],
    [/(?<=water-to-light map):/, /light-to-temperature/],
    [/(?<=light-to-temperature map):/, /temperature-to-humidity/],
    [/(?<=temperature-to-humidity map):/, /humidity-to-location/],
    [/(?<=humidity-to-location map):/],
  ];

  const endOfString: number =
    idx !== 6 ? data.search(mapRegex[idx][1]) : data.length;

  return data
    .substring(data.search(mapRegex[idx][0]) + 2, endOfString)
    .split('\n')
    .filter((line: string) => line !== '')
    .map((line: string) =>
      line.split(' ').map((number: string) => parseInt(number))
    );
};

const findMap = (source: number, idx: number = 0): number => {
  const nextIdx = idx + 1;
  if (idx === 7) {
    return source;
  }
  let newMap: number = source;
  mapTables[idx].forEach((line: number[]) => {
    const sourceRange = [line[1], line[1] + line[2]];
    if (source >= sourceRange[0] && source <= sourceRange[1]) {
      const difference: number = source - sourceRange[0];
      newMap = line[0] + difference;
    }
  });
  return findMap(newMap, nextIdx);
};

displaySolution();
