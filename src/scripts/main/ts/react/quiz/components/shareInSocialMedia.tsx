import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_STAGE } from '../../../redux/reducer';

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

function sharer(link: string) {
  window.open(
    link,
    'sharer',
    'width=700,height=400,left=200,top=100,location=no, directories=no,status=no,toolbar=no,menubar=no'
  );
}

function shareVK(event: React.MouseEvent) {
  event.preventDefault();

  const url = encodeURIComponent(location.origin);
  const title = encodeURIComponent('Я прошел тест на ITSOFT');
  const metaIMG: HTMLMetaElement | null = document.querySelector('meta[property="og:image"]');
  let image;

  if (metaIMG) {
    image = encodeURIComponent(metaIMG.content);
  }

  const shareLink = 'https://vk.com/share.php?url=' + url + '&title=' + title + '&image=' + image;

  if (window.innerWidth >= 992) {
    sharer(shareLink);
  } else {
    window.open(shareLink);
  }
}

function shareFB(event: React.MouseEvent) {
  event.preventDefault();

  const url = encodeURIComponent(location.origin);
  const title = encodeURIComponent('Я прошел тест на ITSOFT');
  const shareLink = 'http://www.facebook.com/sharer.php?u=' + url + '&t' + title;

  if (window.innerWidth >= 992) {
    sharer(shareLink);
  } else {
    window.open(shareLink);
  }
}

function shareOK(event: React.MouseEvent) {
  event.preventDefault();

  const url = encodeURIComponent(location.origin);
  const title = encodeURIComponent('Я прошел тест на ITSOFT');
  const metaIMG: HTMLMetaElement | null = document.querySelector('meta[property="og:image"]');
  let image;

  if (metaIMG) {
    image = encodeURIComponent(metaIMG.content);
  }

  const shareLink = 'https://connect.ok.ru/offer?url=' + url + '&title=' + title + '&imageUrl=' + image;

  if (window.innerWidth >= 992) {
    sharer(shareLink);
  } else {
    window.open(shareLink);
  }
}
