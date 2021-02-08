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
    url: '/src/data/operating_system.json',
    selector: '#test_1',
    resultCb: showResultColoOne,
  },
  {
    url: '/src/data/colocation.json',
    selector: '#colocation-test1',
    resultCb: showResultDataCenters,
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

function showResultDataCenters(result: number) {
  let message;

  if (result <= 4) {
    message =
      'Увы, вы плохо знакомы с устройством дата-центров. Рекомендуем <a href="/data-center/nord4/#it_message" target="_blank">записаться</a> к нам на экскурсию, расскажем это и многое другое!';
  } else if (result >= 5 && result <= 7) {
    message =
      'Вы уже что-то знаете, но далеко не все! Узнать больше информации можно у нас на <a href="/data-center/nord4/" target="_blank">сайте</a> или <a href="/data-center/nord4/#it_message" target="_blank">записавшись</a> на экскурсию.';
  } else {
    message =
      'Вы отлично знакомы с дата-центрами! А значит, вы поняли, что у нас есть все необходимое. Ждем <a href="/data-center/colocation/#order" target="_blank">заявку</a>!';
  }

  return message;
}
