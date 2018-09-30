import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import dpayAPI from './dpayAPI';
import createDSocialAPI from '../common/services/createDSocialAPI';
import history from './history';
import errorMiddleware from './helpers/errorMiddleware';
import createReducer from './reducers';

export default dPayIdAPI => {
  let preloadedState;
  if (typeof window !== 'undefined') {
    /* eslint-disable no-underscore-dangle */
    preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
    /* eslint-enable no-underscore-dangle */
  }

  const middleware = [
    errorMiddleware,
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
    }),
    thunk.withExtraArgument({
      dpayAPI,
      dPayIdAPI,
      dsocialAPI: createDSocialAPI(),
    }),
    routerMiddleware(history),
  ];

  let enhancer;
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(...middleware));
  } else {
    enhancer = compose(applyMiddleware(...middleware));
  }

  return createStore(createReducer(), preloadedState, enhancer);
};
