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

const allQuizes: NodeListOf<HTMLElement> = document.querySelectorAll('.js-quiz');
allQuizes.forEach(quiz => createReactApp(testsUrl, quiz));
