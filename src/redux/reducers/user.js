import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOAD_SECURITY,
  UPDATE_SUCCESS,
  UPDATE_CITY,
} from '../constants/user.js';

const initialState = {
  failed: false,
  loaded: true,
  data: {},
  security: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: false,
        failed: false,
      };
    case LOAD_SUCCESS: {
      const data = action.data;
      return {
        ...state,
        loaded: true,
        failed: false,
        data,
      };
    }
    case UPDATE_SUCCESS: {
      const data = action.data;
      return {
        ...state,
        loaded: true,
        failed: false,
        data: {
          ...state.data,
          ...data
        },
      };
    }
    case UPDATE_CITY: {
      const { city, } = action;
      return {
        ...state,
        loaded: true,
        failed: false,
        data: {
          ...state.data,
          city,
        },
      };
    }

    case LOAD_FAIL:
      return {
        ...state,
        loaded: true,
        failed: true,
        error: action.error,
      };
    case LOAD_SECURITY:
      return {
        ...state,
        loaded: true,
        security: action.data,
      };
    default:
      return state;
  }
}
