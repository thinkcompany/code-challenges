import { createStore, applyMiddleware } from 'redux';
import RootReducer from './../reducers/root_reducer';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const configureStore = (preloadedState = {}) => (
  createStore(RootReducer, preloadedState, applyMiddleware(thunk, logger)
));

export default configureStore;
