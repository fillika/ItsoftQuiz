import { TQuiestion } from "../react/quiz";

export const RELOAD_TEST = 'RELOAD_TEST',
  CHANGE_STAGE = 'CHANGE_STAGE',
  LOAD_NEW_QUESTIONS = 'LOAD_NEW_QUESTIONS',
  SET_RESULT_NAME = 'SET_RESULT_NAME',
  SHOW_RESULT = 'SHOW_RESULT';

export type TState = {
  result: number;
  title: string;
  questionsInitial: TQuiestion[];
  questions: TQuiestion[];
  currentQuestionId: number;
  nextQuestionID: number;
  selected: boolean;
  stage: 'congratulation' | 'result' | 'socialMedia' | null;
  testIsHide: boolean;
  resultCB: null | ((result: number, resultName?: string | undefined) => string);
  resultName?: string | undefined;
};

type TAction = {
  type: string;
  value?: any;
  stage?: 'congratulation' | 'result' | 'socialMedia' | null;
};

const initialState: TState = {
  result: 0,
  title: '',
  questionsInitial: [],
  questions: [],
  currentQuestionId: 1,
  nextQuestionID: 1,
  selected: false,
  stage: null,
  testIsHide: true,
  resultCB: null,
  resultName: undefined,
};

export default function reducer(state: TState = initialState, action: TAction): any {
  switch (action.type) {
    case 'GET_QUESTION':
      return {
        ...state,
        questionsInitial: action.value ? action.value.questions : [],
        questions: action.value ? action.value.questions : [],
        title: action.value ? action.value.title : '',
      };
    case LOAD_NEW_QUESTIONS:
      return {
        ...state,
        questions: action.value,
        nextQuestionID: 1
      };
    case SET_RESULT_NAME:
      return {
        ...state,
        resultName: action.value
      };
    case 'SET_RESULT_CB':
      return {
        ...state,
        resultCB: action.value,
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
        questions: state.questionsInitial,
        currentQuestionId: 1,
        nextQuestionID: 1,
        selected: false,
        result: 0,
        stage: null,
        testIsHide: action.value,
      };
    default:
      return state;
  }
}
