import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TAnswer } from '..';
import { CHANGE_STAGE, TState } from '../../redux/reducer';
import AnswerItem from './answerItem';

type TQuestionComponent = {
  question: string;
  answers: TAnswer[];
};

const QuestionComponent: FC<TQuestionComponent> = ({ question, answers }) => {
  const { questions, currentQuestionId, selected } = useSelector((state: TState) => state);
  const dispatch = useDispatch();

  const bodyClassName = !selected
    ? 'quiz-question quiz-question--active animate'
    : 'quiz-question quiz-question--active';

  function nextQuestion() {
    if (selected) {
      if (currentQuestionId === questions.length) {
        dispatch({ type: CHANGE_STAGE, stage: 'congratulation' });
      } else {
        dispatch({ type: 'NEXT_QUESTION' });
      }
    }
  }

  return (
    <div className={bodyClassName}>
      <header className='quiz-body__header'>
        <p className='quiz-body__question-number'>
          Вопрос {currentQuestionId} из {questions.length}
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
        <button onClick={nextQuestion} className='order-button quiz__order-button'>
          Дальше
        </button>
      </div>
    </div>
  );
};

export default QuestionComponent;
