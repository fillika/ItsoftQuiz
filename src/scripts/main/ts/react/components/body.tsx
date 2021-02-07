import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../redux/reducer';
import CongratsComponent from './conrgatsComponent';
import QuestionComponent from './questionComponent';
import Result from './result';
import ShareInSocialMedia from './shareInSocialMedia';

const Body: FC = () => {
  const state = useSelector((state: TState) => state);
  const render = renderQuestion(state);

  return <div className='quiz-body'>{render}</div>;
};

export default Body;

/**
 * TODO: Затипизировать DISPATCH
 */
function renderQuestion(state: TState) {
  const { questions, currentQuestionId, stage } = state;
  const currentQuestion = questions.filter(({ id }) => id === currentQuestionId);

  /**
   * Отдельно создать в state переменную для анимации, не ориентируясь на select
   */

  switch (stage) {
    case 'congratulation':
      return <CongratsComponent />;
    case 'result':
      return <Result />;
    case 'socialMedia':
      return <ShareInSocialMedia />;
    default:
      if (currentQuestion.length) {
        const { question, answers } = currentQuestion[0];

        return <QuestionComponent question={question} answers={answers} />;
      }
  }
}
