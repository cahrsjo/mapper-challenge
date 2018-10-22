import { combineReducers } from 'redux';
import mappersReducer from './mappersReducer';
import mappingsReducer from './mappingsReducer';

const rootReducer = combineReducers({
  mappers: mappersReducer,
  mappings: mappingsReducer
});

export default rootReducer;
