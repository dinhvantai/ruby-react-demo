import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux';
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import {ToastContainer} from 'react-toastify';

import App from './App.tsx'
import rootReducer from "./store/root-reducer";
import rootSaga from "./store/root-saga";

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App/>
    <ToastContainer/>
  </Provider>,
)
