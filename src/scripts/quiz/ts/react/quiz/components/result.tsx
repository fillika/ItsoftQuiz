import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_STAGE, RELOAD_TEST, TState } from '../redux/reducer';
import { getTestResult } from '../utils/API';

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

      const response = await getTestResult(url, testID, result);
      const { message, status }: resultType = await response.json();

      if (!status) {
        setFinalMessage("Ooooooopss. Something went's wrong");
      } else {
        sessionStorage.setItem(testID!, message);
        setFinalMessage(message);
      }
    };

    if (testID) {
      const answerFromSS = sessionStorage.getItem(testID);

      if (answerFromSS) {
        setFinalMessage(answerFromSS);
      } else {
        postData();
      }
    }

    return () => {};
  }, []);

  return (
    <div className='animation animation--opacity'>
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
          <button
            onClick={() => dispatch({ type: CHANGE_STAGE, stage: 'socialMedia' })}
            className='quiz-link quiz-link--share'>
            Хотите поделиться результатами?
          </button>
        </div>

        <div>
          <button onClick={() => dispatch({ type: RELOAD_TEST, value: false })} className='quiz-link quiz-link--share'>
            Пройти тест заново
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
