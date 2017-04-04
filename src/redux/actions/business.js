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

const LATITUDE = 44.8460252;
const LONGITUDE = -0.5736973;

export const loadBusiness = () => {

  return (dispatch, getState) => {
    const { filters, location } = getState();

    dispatch(load());
    //{latitude: LATITUDE, longitude: LONGITUDE}
    return ApiHandler.businesses(true, location.latlng)
    .then(response => {
      if(response && !response.error){
        
        dispatch(success(response));
        
        if(response.length !== 0){
          
          const categories = filters.categories;
          if(categories.length > 0){
            const filterData = response.filter(obj => categories.indexOf(parseInt(obj.business_category_id)) !== -1 );

            dispatch(filterBusiness(filterData));
          }
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
