
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

export const updateAssociation = (cause_attributes) => {
  return {
    type: UPDATE_SUCCESS,
    data: { cause_attributes },
  };
}



export const updateUserData = (id, data) => {

  return (dispatch, getState) => {


    return ApiHandler.updateUserData(id, data)
      .then(response => {

        if (response && !response.error) {
          dispatch(successUpdate(data));
        }
        else {
          dispatch(failure(response.error[0]));
        }
      })
      .catch(message => {
        dispatch(failure(message.error));
      });

  }
};

export const loadUserData = () => {

  return (dispatch, getState) => {

    dispatch(load());

    return ApiHandler.loadUserData()
      .then(response => {

        if (response && !response.error) {
          dispatch(success(response));
        }
        else {
          dispatch(failure(response.error[0]));
        }
      })
      .catch(message => {
        dispatch(failure(message.error));
      });

  }
};

export const onUpdateUserLocation = (location, authorize = false) => {
  return {
    type: UPDATE,
    location,
  };
}

export const sucrityData = (data) => {
  return {
    type: LOAD_SECURITY,
    data
  };
}
