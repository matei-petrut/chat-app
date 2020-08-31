import { createStore } from 'redux';
import nameReducer from './reducers';

const store = createStore(nameReducer);

export default store;