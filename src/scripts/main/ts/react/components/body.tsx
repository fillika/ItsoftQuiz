import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TState } from '../../redux/reducer';
import AnswerItem from './answerItem';
import CongratsComponent from './conrgatsComponent';
import Result from './result';

const Body: FC = () => {
  const { questons, currentQuestionId, selected, showResult } = useSelector((state: TState) => state);
  /**
   * Отдельно создать в state переменную для анимации, не ориентируясь на select
   */
  const bodyClassName = !selected
    ? 'quiz-question quiz-question--active animate'
    : 'quiz-question quiz-question--active';

  const dispatch = useDispatch();

  function renderQuestion() {
    const currentQuestion = questons.filter(({ id }) => id === currentQuestionId);

    /**
     * Если у нас кончились вопросы
     */

    if (showResult) {
      return <Result />;
    } else if (currentQuestionId > questons.length) {
      return <CongratsComponent />;
    } else {
      const [q] = currentQuestion;
      const { question, answers } = q;

      return (
        <div className={bodyClassName}>
          <header className='quiz-body__header'>
            <p className='quiz-body__question-number'>
              Вопрос {currentQuestionId} из {questons.length}
            </p>
            <p className='quiz__question'>{question}</p>
          </header>

          <div className='quiz-body__answer-container'>
            <ul className='quiz-body__answers-list'>
              {answers.map((answer, index) => (
                <AnswerItem {...answer} key={index} />
              ))}
            </ul>
          </div>

          <div>
            <button
              onClick={() => {
                if (selected) {
                  dispatch({ type: 'CHANGE_SELECTED', value: false });
                  dispatch({ type: 'NEXT_QUESTION' });
                }
              }}
              className='order-button quiz__order-button'>
              Дальше
            </button>
          </div>
        </div>
      );
    }
  }

  const render = renderQuestion();

  return <div className='quiz-body'>{render}</div>;
};

export default Body;
