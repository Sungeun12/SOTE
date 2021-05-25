import { combineReducers } from 'redux';

import user from './auth_reducer';
import vote from './vote_reducer';
import group from './group_reducer';

const rootReducer = combineReducers({
  user,
  vote,
  group,
});

export default rootReducer;
