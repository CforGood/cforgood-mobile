import ApiHandler from '../../utils/api';

import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  GO,
} from '../constants/association';


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
    entities
  };
}

export const goToAssociations = (go) => {
  return {
    type: GO,
    go
  };
}


export const loadAssociation = () => {

  return (dispatch, getState) => {
    const { location, auth } = getState();
    //const location = {latlng : { latitude: 44.8460252, longitude: -0.5736973}};
    
    dispatch(load());

    return ApiHandler.associations(location.latlng)
    .then(response => {

      if(response && !response.error){
        
        if(response.length !== 0){
          dispatch(success(response));
        }
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
