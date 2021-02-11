import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_STAGE, RELOAD_TEST, TState } from '../../../redux/reducer';

type resultType = {
  message: string;
  status: boolean;
};

const Result: FC = () => {
  const dispatch = useDispatch();
  const { testID, result } = useSelector((state: TState) => state);
  const [finalMessage, setFinalMessage] = useState('');

  useEffect(() => {
    const postData = async (): Promise<void> => {
      const url = 'http://developer.itsft.ru/phpServer/quizResult.php';

      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        referrerPolicy: 'no-referrer', // no-referrer, *client
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify({
          id: testID,
          result: result,
        }), // body data type must match "Content-Type" header
      });

      const { message, status }: resultType = await response.json();

      if (!status) {
        setFinalMessage('Ooooooopss. Something went\'s wrong');
      } else {
        setFinalMessage(message);
      }
    };

    postData();
    return () => {};
  }, []);

  return (
    <div className='animate'>
      <header className='quiz-body__header'>
        <p className='quiz__question'>Ваш результат:</p>
      </header>
      <div className='quiz-body__answer-container quiz-body__answer-container--result'>
        <div
          className='quiz-body__result quiz-body__result--no-max-height js-quiz-result'
          dangerouslySetInnerHTML={{ __html: finalMessage }}
        />

        <div>
          <button className='order-button quiz__order-button js-fill-order-form'>Связаться с нами</button>
        </div>
        <div>
          <a
            onClick={() => dispatch({ type: CHANGE_STAGE, stage: 'socialMedia' })}
            href='#'
            className='quiz-link quiz-link--share'>
            Хотите поделиться результатами?
          </a>
        </div>
        <div>
          <a
            onClick={() => dispatch({ type: RELOAD_TEST, value: false })}
            href='#'
            className='quiz-link quiz-link--share'>
            Пройти тест заново
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;
