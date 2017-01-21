import { combineEpics } from 'redux-observable';
import { fetchEpic } from '../reducers/simple';
import { sessionEpic, loginEpic, loginSuccessEpic, redirectEpic, logoutEpic } from '../reducers/authentication';
import * as ActionTypes from '../ActionTypes';

export default combineEpics(
  fetchEpic,
  sessionEpic,
  loginSuccessEpic,
  logoutEpic,
  redirectEpic,
  loginEpic
);
