import ApiHandler from '../../utils/api';

import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  FILTER,
  SHOW
} from '../constants/business';

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

export const success = (entities) => {
  return {
    type: LOAD_SUCCESS,
    entities,
  };
}

export const setBusiness = (id) => {
  return {
    type: SHOW,
    id,
  };
}


export const filterBusiness = (entities) => {
  return {
    type: FILTER,
    entities
  };
}

export const loadBusiness = () => {

  return (dispatch, getState) => {
    const { filters,  location } = getState();
    //const location = {latlng : { latitude: 44.8460252, longitude: -0.5736973}};
    dispatch(load());

    return ApiHandler.businesses(true, location.latlng)
    .then(response => {
      if(response && !response.error){
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
