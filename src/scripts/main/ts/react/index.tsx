import createReactApp from './createReactApp';

export type TQuiestion = {
  id: number;
  question: string;
  answers: TAnswer[];
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
    url: '/src/data/colocation.json',
    selector: '#colocation-test1',
    resultCb: showResultColoOne,
  },
  {
    url: '/src/data/howMuch.json',
    selector: '#colocation-test2',
    resultCb: showResultColoOne,
  },
];

testsArray.forEach(({ url, selector, resultCb }) => {
  createReactApp(url, document.querySelector(selector), resultCb);
});

function showResultColoOne(result: number) {
  let message;

  if (result <= 2) {
    message = 'С Linux вы пока не дружите, рекомендуем вам ОС семейства Windows ;)';
  } else if (result >= 3 && result <= 6) {
    message = 'Неплохо! Но недостаточно. Возьмите что-то с визуальным интерфейсом! Например Ubuntu.';
  } else {
    message = 'Отлично! Мы рекомендуем Linux с текстовой консолью!';
  }

  return message;
}
