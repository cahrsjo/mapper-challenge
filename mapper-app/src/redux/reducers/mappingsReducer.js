import * as ACTIONS from '../actions/actions';

export default (state = {}, action) => {
  const mappings = state.mappings || [];

  switch (action.type) {
    case ACTIONS.GET_MAPPINGS:
      return state;
    case ACTIONS.GET_MAPPINGS_SUCCESS:
      return [...action.payload];
    case ACTIONS.ADD_MAPPING:
      mappings.push(action.mapping);
      return {
        ...state,
        ...mappings,
        selectedMapper: action.selectedMapper
      };
    case ACTIONS.REMOVE_MAPPING:
      return state;
    default:
      return state;
  }
};
