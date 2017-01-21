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
