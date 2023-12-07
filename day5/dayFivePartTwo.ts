import Parser from '../utils/dayParser';

let mapTables: number[][][] = [];

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(5);
  //   const data: string =
  //     'seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15\n\nfertilizer-to-water map:\n49 53 8\n0 11 42\n42 0 7\n57 7 4\n\nwater-to-light map:\n88 18 7\n18 25 70\n\nlight-to-temperature map:\n45 77 23\n81 45 19\n68 64 13\n\ntemperature-to-humidity map:\n0 69 1\n1 0 69\n\nhumidity-to-location map:\n60 56 37\n56 93 4';
  const seeds: number[] = data
    .match(/(?<=seeds:\s)[0-9 ]*/)![0]
    .split(' ')
    .map((number: string) => parseInt(number));

  let seedRanges: number[][] = [];
  for (let i: number = 0; i < seeds.length / 2; i++) {
    seedRanges.push([seeds[i * 2] + 1, seeds[i * 2] + seeds[i * 2 + 1]]);
  }

  for (let i: number = 0; i < 7; i++) {
    mapTables.push(createMapTables(i, data));
  }
  mapTables = mapTables.reverse();
  const locations: any = Array.apply(null, Array(100000)).map(function (x, i) {
    return i;
  });
  const seedEnd = locations
    .map((location: number): number => {
      return findMap(location);
    })
    .filter((locationSolution: number) => {
      let inRange: boolean = false;
      seedRanges.forEach((seedRange: number[]) => {
        if (
          locationSolution >= seedRange[0] &&
          locationSolution <= seedRange[1]
        ) {
          inRange = true;
        }
      });
      return inRange;
    });

  //   const seedEnd = [35].map((location: number) => findMap(location));

  //   console.log(seedEnd);
  console.log(Math.min(...seedEnd), 'ANSWER');
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
    const sourceRange = [line[0] + 1, line[0] + line[2]];
    if (source >= sourceRange[0] && source <= sourceRange[1]) {
      const difference: number = source - sourceRange[0];
      newMap = line[1] + difference + 1;
    }
  });

  return findMap(newMap, nextIdx);
};

displaySolution();

//2532866367
