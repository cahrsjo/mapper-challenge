import * as actions from './actions';

export const getMappers = () => ({
  type: actions.GET_MAPPERS
});

export const getMappersSuccess = payload => ({
  type: actions.GET_MAPPERS_SUCCESS,
  payload
});

export const getMappings = payload => ({
  type: actions.GET_MAPPINGS,
  selectedMapper: payload.selectedMapper
});

export const getMappingsSuccess = payload => ({
  type: actions.GET_MAPPINGS,
  payload
});

export const addMapping = data => ({
  type: actions.ADD_MAPPING,
  ...data
});

export const removeMapping = data => ({
  type: actions.REMOVE_MAPPING,
  ...data
});
