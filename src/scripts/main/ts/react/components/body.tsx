import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TState } from '../../store';
import AnswerItem from './answerItem';

const Body: FC = () => {
  const { questons, currentQuestionId, selected } = useSelector((state: TState) => state);
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
    if (currentQuestionId > questons.length) {
      return (
        <div className='quiz-body__answer-container'>
          <div className='quiz__final-msg'>
            <h2>Отлично, вы&nbsp;прошли тест!</h2>
            <div className='quiz__final-msg-image'>
              <img src='/template/img/superman-small.png' alt='superman-small' />
            </div>
          </div>
          <div>
            <button className='order-button quiz__order-button'>Узнать результаты</button>
          </div>
        </div>
      );
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
