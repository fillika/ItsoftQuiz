import { createStore } from 'redux';
import reducer from '../redux/reducer';

function customCreateStore() {
  const store = createStore(
    reducer,
    (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}

export default customCreateStore;
