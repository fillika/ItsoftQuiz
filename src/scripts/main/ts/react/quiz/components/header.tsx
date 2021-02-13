import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RELOAD_TEST } from '../redux/reducer';
import { TState } from '../redux/reducer';

const Header: FC = () => {
  const dispatch = useDispatch();
  const { testIsHide, title } = useSelector((state: TState) => state);

  return (
    <div className='quiz__head-title'>
      <h2 className='quiz__title' dangerouslySetInnerHTML={{ __html: title }} />

      <button
        onClick={() => {
          dispatch({ type: RELOAD_TEST, value: !testIsHide });
        }}
        className='btn-solid btn-solid--orange quiz__head-button js-quiz-start-button'>
          {
            testIsHide
              ? 'Пройти тест'
              : 'Закрыть тест'
          }
        </button>
    </div>
  );
};

export default Header;