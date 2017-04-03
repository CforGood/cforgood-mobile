import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  GO
} from '../constants/association.js';

const initialState = {
  failed: false,
  loaded: false,
  entities: [],
  go: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: true,
        failed: false,
      };
    case LOAD_SUCCESS: {
      const entities = action.entities;
      return {
        ...state,
        loaded: true,
        failed: false,
        entities,
      };
    }
    case GO: {
      return {
        ...state,
        go: action.go,
      };
    }
    case LOAD_FAIL:
      return {
        loaded: true,
        failed: true,
        error: action.error,
      };
    default:
      return state;
  }
}