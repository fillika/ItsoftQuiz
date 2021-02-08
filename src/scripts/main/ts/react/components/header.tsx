import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RELOAD_TEST } from './../../redux/reducer';
import { TState } from '../../redux/reducer';

const Header: FC = () => {
  const dispatch = useDispatch();
  // const budyEl = useSelector((state: TState) => state.bodyRef);
  const { testIsHide } = useSelector((state: TState) => state);

  return (
    <div className='quiz__head-title'>
      <h2 className='quiz__title'>
        Разбираетесь&nbsp;ли вы&nbsp;в&nbsp;дата-центрах? <br /> Давайте проверим!
      </h2>
      <button
        onClick={() => {
          dispatch({ type: RELOAD_TEST, value: !testIsHide });

          // calcHeight(budyEl.current, isHide);
          // setIsHide(!isHide)
        }}
        className='btn-solid btn-solid--orange quiz__head-button js-quiz-start-button'></button>
    </div>
  );
};

export default Header;

function calcHeight(bodyEl: HTMLElement, isHide: boolean) {
  const bodyElParams = bodyEl.getBoundingClientRect();
  const duration = 250;
  const height = 536;
  let start = performance.now(); // Start animation

  function animate(time: any) {
    // Тут Я делаю отсчет анимации. Когда число будет равно 1 - время истекло
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    !isHide ? slideUp(progress) : slideDown(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    } else {
      !isHide && (bodyEl.style.visibility = `hidden`);
    }
  }

  function timing(timeFraction: number) {
    return timeFraction;
  }

  function slideUp(progress: number) {
    const styleHeight = height * progress;
    bodyEl.style.height = `${height - styleHeight}px`;
  }

  function slideDown(progress: number) {
    bodyEl.style.visibility = `visible`;
    const styleHeight = height * progress;
    bodyEl.style.height = `${styleHeight}px`;
  }

  requestAnimationFrame(animate);
}
