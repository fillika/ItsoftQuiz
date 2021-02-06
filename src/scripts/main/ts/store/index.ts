import { createStore } from 'redux';
import { TQuiestion } from '../react';

export type TState = {
  result: number,
  questons: TQuiestion[];
  results: [];
  currentQuestionId: number;
  nextQuestionID: number;
  selected: boolean;
};

type TAction = {
  type: string;
  value?: any;
};

const initialState: TState = {
  result: 0,
  questons: [],
  results: [],
  currentQuestionId: 1,
  nextQuestionID: 1,
  selected: false,
};

function reducer(state: TState = initialState, action: TAction): any {
  switch (action.type) {
    case 'GET_QUESTION':
      return {
        ...state,
        questons: action.value.questons,
        results: action.value.results,
      };
    case 'CHANGE_SELECTED':
      return {
        ...state,
        selected: action.value,
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionId: state.nextQuestionID,
      };
    case 'SET_NEXT_QUESTION_ID':
      return {
        ...state,
        nextQuestionID: action.value,
      };
    case 'CLOSE_QUESTION':
      return {
        ...state,
        currentQuestionId: 1,
        nextQuestionID: 1,
        selected: false,
        result: 0,
      };
    case 'COUNT_RESULT':
      return {
        ...state,
        result: state.result + action.value,
      };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
