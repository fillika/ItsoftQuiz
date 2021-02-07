import { TQuiestion } from '../react';

export const RELOAD_TEST = 'RELOAD_TEST',
  SHOW_RESULT = 'SHOW_RESULT';

export type TState = {
  result: number;
  questons: TQuiestion[];
  results: [];
  currentQuestionId: number;
  nextQuestionID: number;
  selected: boolean;
  showResult: boolean;
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
  showResult: false,
};

export default function reducer(state: TState = initialState, action: TAction): any {
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
    case 'COUNT_RESULT':
      return {
        ...state,
        result: state.result + action.value,
      };
    case SHOW_RESULT:
      return {
        ...state,
        showResult: true,
      };
    case RELOAD_TEST:
      return {
        ...state,
        currentQuestionId: 1,
        nextQuestionID: 1,
        selected: false,
        result: 0,
        showResult: false,
      };
    default:
      return state;
  }
}
