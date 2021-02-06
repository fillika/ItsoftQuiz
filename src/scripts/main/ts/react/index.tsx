import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import store from '../store';
import Header from './components/header';
import Body from './components/body';

export type TQuiestion = {
  id: number;
  question: string;
  answers: TAnswer[];
};

export type TAnswer = {
  text: string;
  joke: string;
  point: number;
  nextQuestionID: number;
  right: boolean;
};

type AppType = {
  url: string;
};

type TResponse = TQuiestion[];

const App: React.FC<AppType> = ({ url }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const start = async (): Promise<void> => {
      const result = await getQuestions(url);
      dispatch({ type: 'GET_QUESTION', value: result });
    };

    start();
  }, []);

  return (
    <div id='colocation-test1' className='quiz js-quiz-test quiz--open'>
      <div className='quiz__wrapper js-quiz-wrapper is-active'>
        <Header />
        <Body />
      </div>
    </div>
  );
};

async function getQuestions(url: string): Promise<TResponse | undefined> {
  return await fetch(url).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.warn(`Fetch error. Status`, response.status);
      return undefined;
    }
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App url='/src/data/colocation.json' />
  </Provider>,
  document.getElementById('ts-react')
);
