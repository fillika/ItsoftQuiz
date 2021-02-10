import createReactApp from './createReactApp';

export type TQuiestion = {
  id: number;
  question: string;
  answers: TAnswer[];
  resultName?: string;
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
  {
    url: '/src/data/tarif.json',
    selector: '#test_2',
    resultCb: showResultTarif,
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

function showResultTarif(result: number, branch: string | undefined): string {
  let message;

  switch (branch) {
    case 'first':
      if (result === 1) {
        message =
          'Windows - довольно требовательная к ресурсам ОС, рекомендуем Виртуальный сервер 2/2/48 HDD за 1300 руб./мес. и не забывайте про стоимость аренды ОС...';
      } else {
        message =
          'Современные ОС на Linux довольно требовательные, например, для  Centos 8 или выше мы рекомендуем Виртуальный сервер 2/2/48 HDD за 1300 руб./мес., но можно установить Centos 7 и взять Виртуальный сервер 1/1/32 HDD за 650 руб./мес., решать вам!';
      }
      return message;
    case 'second':
      if (result <= 3) {
        message = 'Рекомендуем тариф Cloud Standart за 950 руб./мес.';
      } else if (result >= 4 && result <= 5) {
        message = 'Рекомендуем тариф Cloud Optimal за 1 900 руб./мес.';
      } else if (result >= 6 && result <= 10) {
        message = 'Рекомендуем тариф Cloud Maximum за 2 800 руб./мес.';
      } else {
        message =
          'Рекомендуем рассмотреть аренду физического сервера, с тарифами вы можете ознакомиться <a href="/data-center/dedicated/" target="_blank">тут</a>. Но если Виртуальный сервер принципиален - попробуйте тариф Cloud Ultra за 5 600 руб./мес';
      }
      return message;

    default:
      return '';
  }
  return '';
}
