import Parser from '../utils/dayParser';

const mapTables: number[][][] = [];

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(5);
  // const data: string =
  //   'seeds: 46294176\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15\n\nfertilizer-to-water map:\n49 53 8\n0 11 42\n42 0 7\n57 7 4\n\nwater-to-light map:\n88 18 7\n18 25 70\n\nlight-to-temperature map:\n45 77 23\n81 45 19\n68 64 13\n\ntemperature-to-humidity map:\n0 69 1\n1 0 69\n\nhumidity-to-location map:\n60 56 37\n56 93 4';
  // const seeds: number[] = data
  //   .match(/(?<=seeds:\s)[0-9 ]*/)![0]
  //   .split(' ')
  //   .map((number: string) => parseInt(number));

  const seeds = [46294176];
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
  console.log(source, 'source');
  let newMap: number = source;
  mapTables[idx].forEach((line: number[]) => {
    const sourceRange = [line[1] + 1, line[1] + line[2]];
    console.log(
      'sourceRange',
      sourceRange,
      ' ',
      source,
      ' ',
      source >= sourceRange[0] && source <= sourceRange[1]
    );
    if (source >= sourceRange[0] && source <= sourceRange[1]) {
      const difference: number = source - sourceRange[0];
      newMap = line[0] + difference + 1;
    }
  });
  console.log('newMap', newMap);
  return findMap(newMap, nextIdx);
};

displaySolution();
