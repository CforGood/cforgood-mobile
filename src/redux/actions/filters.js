
import {
  UPDATE,
  RESET,
} from '../constants/filters';

import { filterBusiness } from './business'; 

export const filter = (categories) => {
  return {
    type: UPDATE,
    categories
  };
}

export const update = (categories) => {
  return (dispatch, getState) => {
    const { business } = getState();

    if(categories.length > 0){
      const filterData = business.businesses.filter(obj => categories.indexOf(parseInt(obj.business_category_id)) !== -1 );

      dispatch(filterBusiness(filterData));
    }
    else {
      dispatch(filterBusiness(business.businesses));
      
    }

    
    
    
    dispatch(filter(categories));
  }
    
};
  

