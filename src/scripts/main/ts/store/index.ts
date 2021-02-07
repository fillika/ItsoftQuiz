import { createStore } from 'redux';
import reducer from '../redux/reducer';

const store = createStore(
  reducer,
  (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
