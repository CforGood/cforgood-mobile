import { AsyncStorage } from 'react-native';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGIN_LOAD,
  LOGIN,
} from '../constants/auth';

const initialState = {
  isLoggedIn: false,
  loaded: true,
  failure: false,
  LoggedIn: false,
  error: null
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_LOAD:
      return {
        ...state,
        loaded: false,
        failure: false,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loaded: true,
        isLoggedIn: true,
        failure: false,
        error: null,
        
      };
    case LOGIN:
      return {
        ...state,
        loaded: true,
        LoggedIn: true,
        failure: false,
        error: null,
        
      };
    case LOGIN_FAILURE:
      AsyncStorage.removeItem('@CfoorGoodStore:auth');
      return {
        ...state,
        loaded: true,
        isLoggedIn: false,
        failure: true,
        error: action.error
      };
    case LOGOUT_SUCCESS:
      AsyncStorage.removeItem('@CfoorGoodStore:auth');
      return {
        ...state,
        loaded: true,
        isLoggedIn: false,
        LoggedIn: false,
        failure: false,
        error: null,
      };
    default:
      return state;
  }
}

export default reducer;