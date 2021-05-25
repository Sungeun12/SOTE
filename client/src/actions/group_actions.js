import * as api from '../api/group';
import { groupConstants } from '../constants/group_constants';

export const createGroup = data => async dispatch => {
  dispatch({ type: groupConstants.CREATE_GROUP_REQUEST });
  await api.createGroup(data).then(
    response => {
      dispatch({ type: groupConstants.CREATE_GROUP_SUCCESS, payload: response.data });
    },
    error => {
      dispatch({ type: groupConstants.CREATE_GROUP_FAILURE, payload: error.toString() });
    },
  );
};
export const loadAllGroup = (category, order) => async dispatch => {
  dispatch({ type: groupConstants.ALL_GROUP_LOAD_REQUEST });
  await api.loadGroup(category, order).then(
    response => {
      dispatch({ type: groupConstants.ALL_GROUP_LOAD_SUCCESS, payload: response.data });
    },
    error => {
      dispatch({ type: groupConstants.ALL_GROUP_LOAD_FAILURE, payload: error.toString() });
    },
  );
};

export const unloadGroup = () => ({ type: groupConstants.UNLOAD_GROUP });
