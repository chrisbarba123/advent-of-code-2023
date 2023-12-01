const fetchRequest = async (): Promise<string> => {
  const data: any = await fetch('https://adventofcode.com/2023/day/1/input', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie:
        '_ga=GA1.2.216317825.1701182660; _gid=GA1.2.863336555.1701422234; ru=53616c7465645f5f282179c75c316ab2dd36326df1d7535ab4cc9d987c3dd9de19dec355111aceade562a1c6299ff677; session=53616c7465645f5f2866e99d37b18c41dd25635901d1ba72ca4530b5edfd314aa04931b21af694a127a60ec6345ce3133ab63760390c5caac1236c09401b97d4; _ga_MHSNPJKWC7=GS1.2.1701422234.2.1.1701422596.0.0.0',
    },
  }).then((response) => response.text());
  return data;
};

const displaySolution = async (): Promise<void> => {
    let input : Promise<string> = fetchRequest().then(result => result);
    let inputArray: string[] = (await input).split("\n")
};

displayText();
