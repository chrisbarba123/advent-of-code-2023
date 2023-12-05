import Parser from './dayParser';

const displaySolution = async (): Promise<void> => {
  const data: string = await Parser(3);
  const dataSplit = data.split('\n');
  const x = [2, 3];
  for (let i = x.indexOf(2) + 2; i < 9; i++) {
    console.log(i);
  }
  console.log(x);
};

displaySolution();
