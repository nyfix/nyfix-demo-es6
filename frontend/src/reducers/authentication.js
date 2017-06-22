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

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as ActionTypes from '../ActionTypes';
import axios from 'axios';
import openPopup from "utils/auth-popup";
import { push, replace } from 'react-router-redux'

const initialState = {
  isAuthenticated: false,
  user: null,
  debugError: null,
  loading: true,
  errorMessage: null
};

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        errorMessage: null
      };
    case ActionTypes.LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        debugError: action.error,
        errorMessage: action.errorKey
      };
    case ActionTypes.LOGIN_REDIRECT:
      return {
        ...state,
        errorMessage: action.errorKey
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case ActionTypes.GET_SESSION:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.GET_SESSION_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        loading: false,
        errorMessage: null
      };
    case ActionTypes.GET_SESSION_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        debugError: action.error
      };
    case ActionTypes.ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorKey
      };
    default:
      return state;
  }
}

// Public action creators and async actions

export function displayAuthError(errorKey) {
  return {type: ActionTypes.ERROR_MESSAGE, errorKey };
}

export function logout() {
  return { type: ActionTypes.LOGOUT }
}

export function login(auth, redirect) {
  return {
    type: ActionTypes.LOGIN,
    auth,
    redirect
  };
}

export function getSession() {
  return {
    type: ActionTypes.GET_SESSION
  };
}

export function redirectToLoginWithMessage(errorKey, currentPath) {
  return {
    type: ActionTypes.LOGIN_REDIRECT,
    redirect: currentPath,
    errorKey
  };
}

export function logoutEpic(action$) {
  return action$.ofType(ActionTypes.LOGOUT)
    .concatMap(() => axios.get('/api/logout', { noRedirect: true }))
    .map(() => push('/login'))
}

export function loginSuccessEpic(action$) {
  return action$.ofType(ActionTypes.LOGIN_SUCCESS)
    .map(action => replace(action.redirect || '/settings/account'))
}

export function loginEpic(action$) {
  return action$.ofType(ActionTypes.LOGIN)
    .switchMap(action =>
        openPopup(action.auth, `/api/${action.auth}-login?redirect=/api/dummy/redirect`, '_blank')
          .filter(location => location.pathname && location.pathname.indexOf('/api/dummy/redirect') !== -1)
          .take(1)
          .concatMap(() => axios.get('/api/session/user', { noRedirect: true }))
          .map(({data}) => ({ type: ActionTypes.LOGIN_SUCCESS, user: data, redirect: action.redirect }))
          .catch(error => Observable.of({ type: ActionTypes.LOGIN_FAIL, error, errorKey: 'login.error.badLogin'}))
    )
}

export function redirectEpic(action$) {
  return action$.ofType(ActionTypes.LOGIN_REDIRECT)
    .map(action => replace(`/login?redirect=${action.redirect}`))
};

export function sessionEpic(action$) {
  return action$.ofType(ActionTypes.GET_SESSION)
    .switchMap(() =>
      Observable.fromPromise(axios.get('/api/session/user', { noRedirect: true }))
        .map(({data}) => ({ type: ActionTypes.GET_SESSION_SUCCESS, user: data }))
        .catch(error => Observable.of({ type: ActionTypes.GET_SESSION_FAIL, error })))
};
