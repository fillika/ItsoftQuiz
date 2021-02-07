import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_STAGE } from '../../redux/reducer';

const ShareInSocialMedia: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='animate'>
      <header className='quiz-body__header'>
        <div className='ta-right'>
          <a
            onClick={() => dispatch({ type: CHANGE_STAGE, stage: 'result' })}
            href='#'
            className='quiz-link quiz-link--share'>
            Вернуться к результатам
          </a>
        </div>
        <p className='quiz__question ta-center'>Поделиться с друзьями и коллегами</p>
      </header>

      <div className='quiz-body__answer-container'>
        <ul className='quiz-social'>
          <li>
            <a href='#'>
              <img src='/images/quiz/icons/vk.svg' alt='vk' />
            </a>
          </li>
          <li>
            <a href='#'>
              <img src='/images/quiz/icons/facebook.svg' alt='fb' />
            </a>
          </li>
          <li>
            <a href='#'>
              <img src='/images/quiz/icons/odnoklassniki.svg' alt='ok' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShareInSocialMedia;
