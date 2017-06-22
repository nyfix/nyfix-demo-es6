/*************************************************************************
 * ULLINK CONFIDENTIAL INFORMATION
 * _______________________________
 *
 * All Rights Reserved.
 *
 * NOTICE: This file and its content are the property of Ullink. The
 * information included has been classified as Confidential and may
 * not be copied, modified, distributed, or otherwise disseminated, in
 * whole or part, without the express written permission of Ullink.
 ************************************************************************/

import React from 'react';
import reducer from 'reducers';
import epic from 'epics';
import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from 'config/devtools';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware(epic);

const middlewares = process.env.NODE_ENV === 'development' ?
  [applyMiddleware(epicMiddleware, routerMiddleware(browserHistory)), DevTools.instrument()] :
  [applyMiddleware(epicMiddleware, routerMiddleware(browserHistory))];

var initialize = (initialState = {}) => {
  const store = createStore(reducer, initialState, compose(...middlewares));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
};

export default initialize;

