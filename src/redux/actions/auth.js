import ApiHandler from '../../utils/api';

import {
  LOGIN_LOAD,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGIN
} from '../constants/auth';

import { sucrityData } from './user'; 

export const load = () => {
  return {
    type: LOGIN_LOAD
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

export const sigin = () => {
  return {
    type: LOGIN
  };
}

export const signin = (email, password) => {

  return (dispatch) => {
    dispatch(load());
    
    ApiHandler.signin(email, password)
    .then(response => {

      if(response.authentication_token){
        dispatch(sigin());
        dispatch(sucrityData(response));
      }
      else{
        dispatch(failure(response.error));
      }
      
    })
    .catch(message => {
      dispatch(failure(message.error));
      
    });
  }
};
