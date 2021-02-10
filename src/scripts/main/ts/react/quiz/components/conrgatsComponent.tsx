import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_STAGE } from '../../../redux/reducer';

const CongratsComponent: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='quiz-body__answer-container animate'>
      <div className='quiz__final-msg'>
        <h2>Отлично, вы&nbsp;прошли тест!</h2>
        <div className='quiz__final-msg-image'>
          <img src='/template/img/superman-small.png' alt='superman-small' />
        </div>
      </div>
      <div>
        <button onClick={() => dispatch({ type: CHANGE_STAGE, stage: 'result' })} className='order-button quiz__order-button'>
          Узнать результаты
        </button>
      </div>
    </div>
  );
};

export default CongratsComponent;
