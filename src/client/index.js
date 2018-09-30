import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { message } from 'antd';
import Cookie from 'js-cookie';
import dPayIdAPI from './dPayIdAPI';
import history from './history';
import getStore from './store';
import AppHost from './AppHost';
import { getBrowserLocale, loadLanguage } from './translations';
import { setUsedLocale } from './app/appActions';
import { getLocale } from './reducers';

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/service-worker.js');
}

const accessToken = Cookie.get('access_token');
if (accessToken) {
  dPayIdAPI.setAccessToken(accessToken);
}

const store = getStore(dPayIdAPI);

message.config({
  top: 62,
  duration: 3,
});

const render = async Component => {
  const state = store.getState();

  const userLocale = getLocale(state);

  let activeLocale = userLocale;
  if (activeLocale === 'auto') {
    activeLocale = Cookie.get('language') || getBrowserLocale() || 'en-US';
  }

  const lang = await loadLanguage(activeLocale);

  store.dispatch(setUsedLocale(lang));

  ReactDOM.hydrate(
    <Provider store={store}>
      <Component history={history} />
    </Provider>,
    document.getElementById('app'),
  );
};

render(AppHost);
