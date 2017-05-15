import ApiHandler from '../../utils/api';

import {
  REVIEW,
  REVIEW_SAVE,
  REVIEW_CANCEL,
} from '../constants/review';


export const cancelReview = (perk) => {
  return {
    type: REVIEW_CANCEL
  };
}


export const feedback = (use, flag) => {
  
  return (dispatch) => {
    ApiHandler.feedback(use, flag)
    .then(response => {    
      dispatch(SuccessReview());
    })
    .catch(message => {
      dispatch(failure(message.error));
      
    });
  }
};


export const failure = () => {
  return {
    type: REVIEW_SAVE,
  };
}

export const SuccessReview = () => {
  return {
    type: REVIEW_SAVE,
  };
}


export const saveReview = (perk, business, use) => {
  return {
    type: REVIEW,
    perk,
    business,
    use
  };
}


export const use = (perk, business, feedback = true) => {
  return (dispatch) => {
    ApiHandler.uses(perk.id)
    .then(response => {
      if(!response.error){
        if(feedback) {
          dispatch(saveReview(perk, business, response.id));
        }
      }
      else {
        dispatch(failure(response.error));
      }
    });
  }

}

