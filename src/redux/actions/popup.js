
import {
  UPDATE_NEARME,
  NO_PERMISSION_LOCATION,
  CHECK_LOCATION,
} from '../constants/popup';

export const noPermissionLocation = () => {
  return {
    type: NO_PERMISSION_LOCATION,
  };
};


export const checkLocation = (check) => {
  return {
    type: CHECK_LOCATION,
    check,
  };
};



export const loadPopupNearMe = (nearme) => {
  return {
    type: UPDATE_NEARME,
    nearme,
  };
};
