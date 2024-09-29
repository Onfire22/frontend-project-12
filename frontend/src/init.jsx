import React from 'react';
import i18next from 'i18next';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './store/index.js';
import rollbarConfig from './helpers/rollbarConfig.js';
import App from './App.jsx';
import resources from './locales/ru.js';
import './index.css';

const init = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
      interpolation: {
        escapeValue: false,
      },
    });

  filter.loadDictionary('ru');
  filter.loadDictionary('en');

  const socket = io();

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18nextInstance}>
              <App socket={socket} />
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
