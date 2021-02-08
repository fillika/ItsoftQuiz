import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import customCreateStore from '../store';
import Header from './components/header';
import Body from './components/body';
import { RELOAD_TEST, TState } from '../redux/reducer';
import { motion, AnimatePresence } from 'framer-motion';
import { TQuiestion } from '.';

type AppType = {
  url: string;
};

type TResponse = TQuiestion[];

export default function createReactApp(
  url: string,
  element: HTMLElement | null,
  resultCb: (result: number, branch?: string | undefined) => string
) {
  const store = customCreateStore();

  if (!element) return;

  const showTest = element.getAttribute('data-show');

  const App: React.FC<AppType> = ({ url }) => {
    const { testIsHide, questions } = useSelector((state: TState) => state);
    const dispatch = useDispatch();

    useEffect(() => {
      const start = async (): Promise<void> => {
        const result = await getQuestions(url);
        dispatch({ type: 'GET_QUESTION', value: result });
        dispatch({ type: 'SET_RESULT_CB', value: resultCb });

        if (showTest) {
          dispatch({ type: RELOAD_TEST, value: false });
        }
      };

      start();
    }, []);

    if (questions?.length === 0) {
      return null;
    }

    return (
      <div className='quiz js-quiz-test quiz--open'>
        <div className='quiz__wrapper js-quiz-wrapper is-active'>
          <Header />
          <AnimatePresence initial={false}>
            {!testIsHide && (
              <motion.section
                key='content'
                initial='collapsed'
                animate='open'
                exit='collapsed'
                variants={{
                  open: { height: 'auto', overflow: 'hidden' },
                  collapsed: { height: 0, overflow: 'hidden' },
                }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}>
                <Body />
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  ReactDOM.render(
    <Provider store={store}>
      <App url={url} />
    </Provider>,
    element
  );
}

async function getQuestions(url: string): Promise<TResponse | undefined> {
  return await fetch(url).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.warn(`Fetch error for url`, url);
      console.warn(`Fetch error. Status`, response.status);
      return undefined;
    }
  });
}
