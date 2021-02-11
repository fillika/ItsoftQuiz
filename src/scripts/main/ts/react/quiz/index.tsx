import createReactApp from './createReactApp';

const testsUrl = 'http://developer.itsft.ru/phpServer/quizQuestions.php';

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
    url: testsUrl,
    testID: 'operatingSystem',
    selector: '#test_1',
  },
  {
    url: testsUrl,
    testID: 'colocationOne',
    selector: '#colocation-test1',
  },
  {
    url: testsUrl,
    testID: 'tarifs',
    selector: '#test_2',
  },
];

testsArray.forEach(({ url, testID, selector }) => {
  createReactApp(url, testID, document.querySelector(selector));
});