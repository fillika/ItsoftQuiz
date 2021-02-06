import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

const Header: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='quiz__head-title'>
      <h2 className='quiz__title'>
        Разбираетесь&nbsp;ли вы&nbsp;в&nbsp;дата-центрах? <br /> Давайте проверим!
      </h2>
      <button
        onClick={() => dispatch({ type: 'CLOSE_QUESTION' })}
        className='btn-solid btn-solid--orange quiz__head-button js-quiz-start-button'></button>
    </div>
  );
};

export default Header;
