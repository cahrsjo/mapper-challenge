import * as ACTIONS from '../actions/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.GET_MAPPERS:
      return { ...state, ...action.payload };
    case ACTIONS.GET_MAPPERS_SUCCESS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
