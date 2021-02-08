import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_STAGE, RELOAD_TEST, TState } from '../../redux/reducer';

const Result: FC = () => {
  const dispatch = useDispatch();
  const { result, resultCB } = useSelector((state: TState) => state);

  return (
    <div className='animate'>
      <header className='quiz-body__header'>
        <p className='quiz__question'>Ваш результат:</p>
      </header>
      <div className='quiz-body__answer-container quiz-body__answer-container--result'>
        <div
          className='quiz-body__result quiz-body__result--no-max-height js-quiz-result'
          dangerouslySetInnerHTML={{ __html: resultCB!(result) }}
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
            onClick={() => dispatch({ type: RELOAD_TEST, value: true })}
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
