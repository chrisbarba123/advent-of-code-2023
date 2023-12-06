import Parser from '../utils/dayParser';

const mapTables: string[][][] = [];

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(5);
  // console.log(data);

  const seeds: string[] = data.match(/(?<=seeds:\s)[0-9 ]*/)![0].split(' ');

  for (let i: number = 0; i < 7; i++) {
    mapTables.push(createMapTables(i, data));
  }
  console.log(data.search(/(?<=humidity-to-location map):/));
  console.dir(mapTables[6], { maxArrayLength: null });
};

const createMapTables = (idx: number, data: string): string[][] => {
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
    .map((line: string) => line.split(' '));
};

displaySolution();
