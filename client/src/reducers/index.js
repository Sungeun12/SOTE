import { combineReducers } from 'redux';

import user from './auth_reducer';

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
