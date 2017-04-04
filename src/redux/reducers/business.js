import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  FILTER,
  SHOW
} from '../constants/business.js';

const initialState = {
  failed: false,
  loaded: false,
  loading: false,
  entities: [],
  businessId: null

};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: false,
        failed: false,
      };
    case LOAD_SUCCESS: {
      console.log(action.entities, 'action.entities' )
      const entities = action.entities;
      return {
        ...state,
        loaded: true,
        failed: false,
        entities,
        businesses: entities,
      };
    }
    case FILTER: {
      const entities = action.entities;
      return {
        ...state,
        entities,
      };
    }
    case LOAD_FAIL:
      return {
        loaded: true,
        failed: true,
        error: action.error,
      };
    case SHOW:
      return {
        ...state,
        businessId: action.id,
      };
    default:
      return state;
  }
}