
import {
  UPDATE,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOAD_SECURITY,
  UPDATE_SUCCESS,
} from '../constants/user';

import ApiHandler from '../../utils/api';

export const load = () => {
  return {
    type: LOAD
  };
}

export const failure = (error) => {
  return {
    type: LOAD_FAIL,
    error: error,
  };
}

export const success = (data) => {
  return {
    type: LOAD_SUCCESS,
    data
  };
}

export const successUpdate = (data) => {
  return {
    type: UPDATE_SUCCESS,
    data
  };
}



export const updateUserData = (id, data) => {

  return (dispatch, getState) => {
     
    console.log('updateUserData', data, id)
    return ApiHandler.updateUserData(id, data)
    .then(response => {
      
      if(response && !response.error)
      {
        console.log('successUpdate', response)
        dispatch(successUpdate(data));
      }
      else{
        console.log('error Update Server', response)
      }
    })
    .catch(message => {
      console.log('errorUpdate', message)
      dispatch(failure(message.error));
    });
    
  }
};

export const loadUserData = () => {

  return (dispatch, getState) => {

    dispatch(load());

    return ApiHandler.loadUserData()
    .then(response => {
      
      if(response && !response.error)
      {
      	dispatch(success(response));
      }
      else
      {
        dispatch(failure('error'));
      }
    })
    .catch(message => {
      dispatch(failure(message.error));
    });
    
  }
};

export const onUpdateUserLocation = (location) => {
  return {
    type: UPDATE,
    location
  };
}

export const sucrityData = (data) => {
  return {
    type: LOAD_SECURITY,
    data
  };
}