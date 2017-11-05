import {
  UPDATE_LOCATION,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOAD_SECURITY,
  UPDATE_SUCCESS,
  UPDATE_CITY
} from '../constants/user';

import ApiHandler from '../../utils/api';

export const load = () => {
  return {
    type: LOAD
  };
};

export const failure = error => {
  return {
    type: LOAD_FAIL,
    error: error
  };
};

export const success = data => {
  return {
    type: LOAD_SUCCESS,
    data
  };
};

export const successUpdate = data => {
  return {
    type: UPDATE_SUCCESS,
    data
  };
};

export const updateAssociation = cause_attributes => {
  return {
    type: UPDATE_SUCCESS,
    data: { cause_attributes }
  };
};

export const updateUserData = (id, data) => {
  return (dispatch, getState) => {
    dispatch(load());
    return ApiHandler.updateUserData(id, data)
      .then(response => {
        if (response && !response.error) {
          dispatch(successUpdate(data));
          dispatch(loadUserData());
        } else {
          dispatch(failure(response.error[0]));
        }
      })
      .catch(message => {
        dispatch(failure(message.error));
      });
  };
};

export const loadUserData = () => {
  return (dispatch, getState) => {
    dispatch(load());

    return ApiHandler.loadUserData()
      .then(response => {
        if (response && !response.error) {
          dispatch(success(response));
        } else {
          dispatch(failure(response.error[0]));
        }
      })
      .catch(message => {
        dispatch(failure(message.error));
      });
  };
};

export const onUpdateUserLocation = location => {
  return (dispatch, getState) => {
    ApiHandler.geocode(location.latitude, location.longitude)
      .then(async response => {
        let zipcode = '33300';
        let city = 'Bordeaux';
        await response.forEach(address => {
          if (address.types.indexOf('postal_code') !== -1) {
            zipcode = address.long_name;
          }
          if (
            address.types.indexOf('administrative_area_level_1') !== -1 ||
            address.types.indexOf('administrative_area_level_2') !== -1
          ) {
            city = address.long_name;
          }
        });
        dispatch({
          type: UPDATE_CITY,
          city,
          zipcode
        });
      })
      .catch(message => {});
    dispatch({
      type: UPDATE_LOCATION,
      location
    });
  };
};

export const geocode = location => {
  if (location && location.latitude) {
    return (dispatch, getState) => {
      ApiHandler.geocode(location.latitude, location.longitude)
        .then(async response => {
          let zipcode = '33300';
          let city = 'Bordeaux';

          await response.forEach(address => {
            if (address.types.indexOf('postal_code') !== -1) {
              zipcode = address.long_name;
            }
            if (address.types.indexOf('locality') !== -1) {
              city = address.long_name;
            }
          });
          dispatch({
            type: UPDATE_CITY,
            city,
            zipcode
          });
        })
        .catch(message => {});
    };
  }

  return (dispatch, getState) => {};
};

export const sucrityData = data => {
  return {
    type: LOAD_SECURITY,
    data
  };
};
