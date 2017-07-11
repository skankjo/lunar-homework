import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import App from './components/App/App';
import rootReducer from './reducers';

const history = createBrowserHistory();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reduxLoggerMiddleware = createLogger({
  collapsed: true,
  stateTransformer: state => JSON.parse(JSON.stringify(state)),
});
const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      reduxLoggerMiddleware,
      thunkMiddleware,
      promiseMiddleware(),
    ),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'));
