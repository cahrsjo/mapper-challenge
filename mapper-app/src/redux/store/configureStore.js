import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers/reducers';
import getMappersSaga from '../sagas/getMappersSaga';
import addMappingSaga from '../sagas/addMappingSaga';
import getMappingsSaga from '../sagas/getMappingsSaga';
import removeMappingSaga from '../sagas/removeMappingSaga';

const configureStore = preloadedState => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware, createLogger()))
  );

  //TODO: Loop sagas
  sagaMiddleware.run(getMappersSaga);
  sagaMiddleware.run(addMappingSaga);
  sagaMiddleware.run(getMappingsSaga);
  sagaMiddleware.run(removeMappingSaga);
  return store;
};

export default configureStore;
