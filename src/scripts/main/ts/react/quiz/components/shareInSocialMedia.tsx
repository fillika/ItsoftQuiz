import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_STAGE } from '../redux/reducer';
import { shareFB, shareOK, shareVK } from '../utils/share';

const ShareInSocialMedia: FC = () => {
  const dispatch = useDispatch();

  function backToResult() {
    dispatch({ type: CHANGE_STAGE, stage: 'result' });
  }

  return (
    <div className='animate'>
      <header className='quiz-body__header'>
        <div className='ta-right'>
          <button onClick={backToResult} className='quiz-link quiz-link--share'>
            Вернуться к результатам
          </button>
        </div>
        <p className='quiz__question ta-center'>Поделиться с друзьями и коллегами</p>
      </header>

      <div className='quiz-body__answer-container'>
        <ul className='quiz-social'>
          <li>
            <a onClick={shareVK} href='#'>
              <img src='/images/quiz/icons/vk.svg' alt='vk' />
            </a>
          </li>
          <li>
            <a onClick={shareFB} href='#'>
              <img src='/images/quiz/icons/facebook.svg' alt='fb' />
            </a>
          </li>
          <li>
            <a onClick={shareOK} href='#'>
              <img src='/images/quiz/icons/odnoklassniki.svg' alt='ok' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShareInSocialMedia;
