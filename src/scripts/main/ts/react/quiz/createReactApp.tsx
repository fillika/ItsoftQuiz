import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import customCreateStore from './store';
import Header from './components/header';
import Body from './components/body';
import { RELOAD_TEST, TState } from './redux/reducer';
import { motion, AnimatePresence } from 'framer-motion';
import { TQuiestion } from '.';
import { getQuestions } from './utils/API';

export type TResponse = {
  questions: TQuiestion[];
  testID: string;
  title: string;
};

export default function createReactApp(url: string, element: HTMLElement) {
  const store = customCreateStore();
  const showTest = element.getAttribute('data-show');
  const testID = element.getAttribute('data-test-id');

  if (testID === null) {
    console.warn('Please, add "data-test-id" attribute for:', element);
    return;
  }

  const App: React.FC = () => {
    const { testIsHide, questions } = useSelector((state: TState) => state);
    const dispatch = useDispatch();

    useEffect(() => {
      const start = async (): Promise<void> => {
        const result = await getQuestions(url, testID);

        dispatch({ type: 'GET_QUESTION', response: result });

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
      <div className='quiz js-quiz-test'>
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
      <App />
    </Provider>,
    element
  );
}

