import { combineReducers } from 'redux';

import user from './auth_reducer';
import vote from './vote_reducer';

const rootReducer = combineReducers({
  user,
  vote,
});

export default rootReducer;
