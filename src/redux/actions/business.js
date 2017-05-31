import ApiHandler from '../../utils/api';

import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_PERK_SUCCESS,
  LOAD_FAIL,
  LOAD_PERK_FAIL,
  FILTER,
  SHOW
} from '../constants/business';

export const load = () => {
  return {
    type: LOAD
  };
}

export const failure = (error, online) => {
  return {
    type: online === true ? LOAD_PERK_FAIL : LOAD_FAIL,
    error: error,
  };
}

export const success = (entities, online) => {
  return {
    type: online === true ? LOAD_PERK_SUCCESS : LOAD_SUCCESS,
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
    const { filters, location } = getState();
    //location
    //const location = { latlng: { latitude: 44.8460252, longitude: -0.5736973 } };
    dispatch(load());

    ApiHandler.businesses(false, location.latlng)
      .then(response => {
        if (response && !response.error) {
          dispatch(success(response, false));
        }
        else {
          //dispatch(failure('error', false));
        }
      })
      .catch(message => {
        //dispatch(failure(message.error, false));
      });

    ApiHandler.businesses(true, location.latlng)
      .then(response => {
        if (response && !response.error) {
          dispatch(success(response, true));
        }
        else {
          //dispatch(failure('error', true));
        }
      })
      .catch(message => {
        //dispatch(failure(message.error, true));
      });






    return true;
  }
};
