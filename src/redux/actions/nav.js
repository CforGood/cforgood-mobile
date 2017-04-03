
import {
  NAVIGATE,
} from '../constants/nav';

export const navigate = (route, params = {}) => {
  return {
    type: NAVIGATE,
    route,
    params
  };
}

