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
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_LOAD:
      return {
        ...state,
        loaded: true,
        failure: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loaded: true,
        isLoggedIn: true,
        failure: false,
        
      };
    case LOGIN:
      return {
        ...state,
        loaded: true,
        LoggedIn: true,
        failure: false,
        
      };
    case LOGIN_FAILURE:
      AsyncStorage.removeItem('@CfoorGoodStore:auth');
      return {
        ...state,
        loaded: false,
        isLoggedIn: false,
        failure: true,
      };
    case LOGOUT_SUCCESS:
      AsyncStorage.removeItem('@CfoorGoodStore:auth');
      return {
        ...state,
        loaded: false,
        isLoggedIn: false,
        LoggedIn: false,
        failure: false,
      };
    default:
      return state;
  }
}

export default reducer;