import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TAnswer, TQuiestion } from '.';
import { CHANGE_STAGE, TState, LOAD_NEW_QUESTIONS, SET_RESULT_NAME } from '../../../redux/reducer';
import AnswerItem from './answerItem';

type TQuestionComponent = {
  question: string | TQuiestion[];
  answers: TAnswer[];
  resultName?: string | undefined;
};

const QuestionComponent: FC<TQuestionComponent> = ({ question, answers, resultName }) => {
  const { questions, currentQuestionId, nextQuestionID, selected } = useSelector((state: TState) => state);
  const dispatch = useDispatch();

  const bodyClassName = !selected
    ? 'quiz-question quiz-question--active animate'
    : 'quiz-question quiz-question--active';

  function nextQuestion() {
    if (selected) {
      // Тут сложная логика. У меня внутри вопроса вместо строки новый массив с вопросом.
      // Поэтому Я проверяю, массив или строка и если массив, то переопределяю state
      // newQuestion - Это объект.
      const [newQuestion] = questions.filter(({ id }) => id === nextQuestionID);

      if (Array.isArray(newQuestion?.question)) {
        dispatch({ type: LOAD_NEW_QUESTIONS, value: newQuestion.question });
        dispatch({ type: 'NEXT_QUESTION' });
        return;
      }

      if (resultName) {
        dispatch({ type: CHANGE_STAGE, stage: 'congratulation' });
        dispatch({ type: SET_RESULT_NAME, value: resultName });
        return;
      }

      if (currentQuestionId === questions?.length) {
        dispatch({ type: CHANGE_STAGE, stage: 'congratulation' });
      } else {
        dispatch({ type: 'NEXT_QUESTION' });
      }
    }
  }

  if (typeof question === 'string') {
    return (
      <>
        <div className={bodyClassName}>
          <header className='quiz-body__header'>
            <p className='quiz-body__question-number'>
              Вопрос {currentQuestionId} из {questions.length}
            </p>

            <p className='quiz__question' dangerouslySetInnerHTML={{ __html: question }} />
          </header>

          <div className='quiz-body__answer-container'>
            <ul className='quiz-body__answers-list'>
              {answers.map((answer, index) => (
                <AnswerItem {...answer} key={index} />
              ))}
            </ul>

            <div>
              <button onClick={nextQuestion} className='order-button quiz__order-button'>
                Дальше
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <div>Что-то пошло не так...</div>;
};

export default QuestionComponent;
