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

import { combineReducers } from 'redux';
import simple from './simple';
import authentication from './authentication';
import locale from './locale';
import { routerReducer as routing } from 'react-router-redux';

export default combineReducers({
  simple,
  authentication,
  locale,
  routing
});
