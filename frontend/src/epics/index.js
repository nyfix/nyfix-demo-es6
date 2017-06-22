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
