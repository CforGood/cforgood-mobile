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
      const { city, zipcode } = action;

      
      return {
        ...state,
        failed: false,
        loaded: true,
        data: {
          ...state.data,
          city,
          zipcode
        },
      };
    }

    case LOAD_FAIL:
    console.log('UPDATEFAIL', action)
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
