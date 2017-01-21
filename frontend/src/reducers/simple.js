import { Observable } from 'rxjs/Observable';
import * as ActionTypes from '../ActionTypes';
import axios from 'axios';

const initialState = {
  items: []
};

// Reducer

export default function simpleReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        items: action.result.data
      };
    default:
      return state;
  }
}

// Actions

export function fetchSimple() {
  return  {
    type: ActionTypes.FETCH
  };
}

// Epic

export function fetchEpic(action$) {
  return action$.ofType(ActionTypes.FETCH)
    .switchMap(() =>
      Observable.fromPromise(axios.get('/api/simple'))
        .map(result => ({ type: ActionTypes.FETCH_SUCCESS, result }))
        .catch(() => Observable.of({ type: ActionTypes.FETCH_FAIL })))
};
