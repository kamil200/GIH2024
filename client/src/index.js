import React from 'react';
import 'antd/dist/reset.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import i18n from './i18n'; // Import your i18n configuration
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render
(
  <I18nextProvider i18n={i18n}>
  <Suspense fallback="loading">
  <Provider store={store}>
    <App />
  </Provider>
  </Suspense>
  </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
