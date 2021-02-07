import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TState } from '../../redux/reducer';
import { TAnswer } from './../index';

const AnswerItem: FC<TAnswer> = ({ text, joke, point, nextQuestionID, right }) => {
  const { selected } = useSelector((state: TState) => state);
  const [isActive, setActive] = useState(selected);
  const dispatch = useDispatch();

  const rightOrWrongClassName = right ? 'answer__joke' : 'answer__joke answer__joke--wrong'
  const animateClassName = isActive ? `${rightOrWrongClassName} animate` : `${rightOrWrongClassName}`;

  useEffect(() => {
    /**
     * Логика такая, что мы привязываемся к selected из state
     * Так как isActive у нас локальное состояние, то оно не меняется при изменении
     * Глобального state. Поэтому Я отлавливаю изменение глобального state и
     * меняю локальный.
     */
    if (isActive && !selected) {
      setActive(false);
    }
  }, [selected]);

  return (
    <li
      onClick={() => {
        if (!selected) {
          setActive(true);
          dispatch({ type: 'CHANGE_SELECTED', value: true });
          dispatch({ type: 'COUNT_RESULT', value: point });
          dispatch({ type: 'SET_NEXT_QUESTION_ID', value: nextQuestionID });
        }
      }}
      className='answer'>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <div className={animateClassName} dangerouslySetInnerHTML={{ __html: joke }} />
    </li>
  );
};

export default AnswerItem;
