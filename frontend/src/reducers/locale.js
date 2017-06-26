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

import * as ActionTypes from '../ActionTypes';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SET_LOCALE:
      return {
        currentLocale: action.locale
      };
    default:
      return state;
  }
}

export function setLocale(locale) {
  return {
    type: ActionTypes.SET_LOCALE,
    locale
  }
}
