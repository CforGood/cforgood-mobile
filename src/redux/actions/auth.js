import { AsyncStorage } from 'react-native';
import ApiHandler from '../../utils/api';

import {
  LOGIN_LOAD,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGIN
} from '../constants/auth';


import { sucrityData, loadUserData } from './user';

export const load = (type) => {
  return {
    type: LOGIN_LOAD,
    typeAuth: type
  };
}

export const failure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error: error,
  };
}

export const signout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
}

export const siginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
}


export const signup = (user, type = 'email') => {
  return async (dispatch) => {

    dispatch(load('signup', type));

    ApiHandler.signup(user)
      .then(response => {
        if (response.id) {
          dispatch(signin(user.email, user.password, type));
        } else if (response.error) {
          dispatch(failure(response.error));
        }
      })
      .catch(message => {
        dispatch(failure(message.error));
      });

  }
}

export const sigin = () => {
  return {
    type: LOGIN
  };
}

export const signin = (email, password, type = 'email') => {

  return (dispatch) => {
    dispatch(load('signin'));

    ApiHandler.signin(email, password, type)
      .then(response => {
        if (response.authentication_token) {
          dispatch(sigin());
          dispatch(sucrityData(response));
        }
        else {
          dispatch(failure(response.error));
        }

      })
      .catch(message => {
        dispatch(failure(message.error));

      });
  }
};
