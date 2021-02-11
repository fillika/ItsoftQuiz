import createReactApp from './createReactApp';

export type TQuiestion = {
  id: number;
  question: string;
  answers: TAnswer[];
  testID?: string;
};

export type TAnswer = {
  text: string;
  joke: string;
  point: number;
  nextQuestionID: number;
  right: boolean;
};

const testsArray = [
  {
    url: '/src/data/operating_system.json',
    selector: '#test_1',
  },
  {
    url: '/src/data/colocation.json',
    selector: '#colocation-test1',
  },
  {
    url: '/src/data/tarif.json',
    selector: '#test_2',
  },
];

testsArray.forEach(({ url, selector }) => {
  createReactApp(url, document.querySelector(selector));
});