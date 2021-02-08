import { TQuiestion } from '../react';

export const RELOAD_TEST = 'RELOAD_TEST',
  CHANGE_STAGE = 'CHANGE_STAGE',
  SHOW_RESULT = 'SHOW_RESULT';

export type TState = {
  result: number;
  questions: TQuiestion[];
  results: [];
  currentQuestionId: number;
  nextQuestionID: number;
  selected: boolean;
  stage: 'congratulation' | 'result' | 'socialMedia' | null;
  bodyRef: any;
};

type TAction = {
  type: string;
  value?: any;
  stage?: 'congratulation' | 'result' | 'socialMedia' | null;
};

const initialState: TState = {
  result: 0,
  questions: [],
  results: [],
  currentQuestionId: 1,
  nextQuestionID: 1,
  selected: false,
  stage: null,
  bodyRef: null,
};

export default function reducer(state: TState = initialState, action: TAction): any {
  switch (action.type) {
    case 'GET_QUESTION':
      return {
        ...state,
        questions: action.value.questions,
        results: action.value.results,
      };
    case 'CHANGE_SELECTED':
      return {
        ...state,
        selected: action.value,
      };
    case CHANGE_STAGE:
      return {
        ...state,
        stage: action.stage,
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionId: state.nextQuestionID,
        selected: false,
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
    case RELOAD_TEST:
      return {
        ...state,
        currentQuestionId: 1,
        nextQuestionID: 1,
        selected: false,
        result: 0,
        stage: null,
      };
    case 'SET_BODY_REF':
      return {
        ...state,
        bodyRef: action.value
      };
    default:
      return state;
  }
}
