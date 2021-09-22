import * as api from '../api/myPage';
import { leaveGroup } from '../api/group';
import { myPageConstants } from '../constants/myPage_constant';

export const loadParticipatedVote = id => async dispatch => {
  dispatch({ type: myPageConstants.PARTICIPATED_VOTE_LOAD_REQUEST });
  await api.loadParticipatedVote(id).then(
    response => {
      dispatch({ type: myPageConstants.PARTICIPATED_VOTE_LOAD_SUCCESS, payload: response.data });
    },
    error => {
      dispatch({ type: myPageConstants.PARTICIPATED_VOTE_LOAD_FAILURE, payload: error.toString() });
    },
  );
};

export const loadUserGroup = id => async dispatch => {
  dispatch({ type: myPageConstants.USER_GROUP_LOAD_REQUEST });
  await api.loadUserGroup(id).then(
    response => {
      dispatch({ type: myPageConstants.USER_GROUP_LOAD_SUCCESS, payload: response.data });
    },
    error => {
      dispatch({ type: myPageConstants.USER_GROUP_LOAD_FAILURE, payload: error.toString() });
    },
  );
};

export const leaveUserGroup = (id, userId) => async dispatch => {
  dispatch({ type: myPageConstants.USER_GROUP_LEAVE_REQUEST });
  await leaveGroup(id, userId).then(
    response => {
      if (response.data.success) {
        dispatch({ type: myPageConstants.USER_GROUP_LEAVE_SUCCESS, payload: id });
        alert('단체에 탈퇴하였습니다.');
      }
    },
    error => {
      dispatch({ type: myPageConstants.USER_GROUP_LEAVE_FAILURE, payload: error.toString() });
      alert('단체 탈퇴에 실패했습니다.');
    },
  );
};
