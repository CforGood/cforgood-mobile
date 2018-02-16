import { AsyncStorage } from 'react-native';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGIN_LOAD,
  LOGIN,
  SIGNUP_SUCESS
} from '../constants/auth';

const initialState = {
  isSignUp: false,
  isLoggedIn: false,
  loaded: true,
  failure: false,
  LoggedIn: false,
  error: null,
  typeAuth: 'signup',
  typeSignIn: ''
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGNUP_SUCESS:
      return {
        ...state,
        isSignUp: true
      };
    case LOGIN_LOAD:
      return {
        ...state,
        loaded: false,
        failure: false,
        error: null,
        typeAuth: action.typeAuth
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loaded: true,
        isLoggedIn: true,
        failure: false,
        error: null
      };
    case LOGIN:
      return {
        ...state,
        loaded: true,
        LoggedIn: true,
        failure: false,
        error: null,
        typeSignIn: action.typeSignIn
      };
    case LOGIN_FAILURE:
      AsyncStorage.removeItem('@CfoorGoodStore:auth');
      return {
        ...state,
        loaded: true,
        isLoggedIn: false,
        failure: true,
        error:
          action.error ||
          'un problème technique est survenu, veuillez réessayer plus tard !'
      };
    case LOGOUT_SUCCESS:
      AsyncStorage.removeItem('@CfoorGoodStore:auth');
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};

export default reducer;
