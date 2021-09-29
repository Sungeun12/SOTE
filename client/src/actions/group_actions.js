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
      dispatch({ type: groupConstants.ALL_GROUP_LOAD_SUCCESS, payload: response.data.data });
    },
    error => {
      dispatch({ type: groupConstants.ALL_GROUP_LOAD_FAILURE, payload: error.toString() });
    },
  );
};
export const loadIdGroup = id => async dispatch => {
  dispatch({ type: groupConstants.ID_GROUP_LOAD_REQUEST });
  await api.loadIdGroup(id).then(
    response => {
      dispatch({ type: groupConstants.ID_GROUP_LOAD_SUCCESS, payload: response.data.data });
    },
    error => {
      dispatch({ type: groupConstants.ID_GROUP_LOAD_FAILURE, payload: error.toString() });
    },
  );
};

export const unloadGroup = () => ({ type: groupConstants.UNLOAD_GROUP });

export const unloadGroupNotice = () => ({ type: groupConstants.UNLOAD_GROUP_NOTICE });

export const loadIdNotice = id => async dispatch => {
  dispatch({ type: groupConstants.ID_NOTICE_LOAD_REQUEST });
  await api.loadIdNotice(id).then(
    response => {
      dispatch({ type: groupConstants.ID_NOTICE_LOAD_SUCCESS, payload: response.data.data });
    },
    error => {
      dispatch({ type: groupConstants.ID_NOTICE_LOAD_FAILURE, payload: error.toString() });
    },
  );
};

export const deleteNotice = id => async dispatch => {
  dispatch({ type: groupConstants.DELETE_NOTICE_REQUEST });
  await api.deleteNotice(id).then(
    response => {
      if (response.data.success) {
        dispatch({ type: groupConstants.DELETE_NOTICE_SUCCESS, payload: id });
      }
    },
    error => {
      dispatch({ type: groupConstants.DELETE_NOTICE_FAILURE, payload: error.toString() });
    },
  );
};

export const updateNotice = (body, noticeId) => async dispatch => {
  dispatch({ type: groupConstants.UPDATE_NOTICE_REQUEST });
  await api.updateNotice(body).then(
    response => {
      if (response.data?.success) {
        dispatch({ type: groupConstants.UPDATE_NOTICE_SUCCESS, payload: { body, noticeId } });
      }
    },
    error => {
      dispatch({ type: groupConstants.UPDATE_NOTICE_FAILURE, payload: error.toString() });
    },
  );
};
