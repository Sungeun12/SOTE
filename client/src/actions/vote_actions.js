import * as api from '../api/vote';
import { voteConstants } from '../constants/vote_constants';

export const loadAllVote = (category, order, closed) => async dispatch => {
  dispatch({ type: voteConstants.ALL_VOTE_LOAD_REQUEST });
  await api.loadVote(category, order, closed).then(
    response => {
      dispatch({ type: voteConstants.ALL_VOTE_LOAD_SUCCESS, payload: response.data });
    },
    error => {
      dispatch({ type: voteConstants.ALL_VOTE_LOAD_FAILURE, payload: error.toString() });
    },
  );
};

export const unloadVote = () => ({ type: voteConstants.UNLOAD_VOTE });

export const loadIdVote = id => async dispatch => {
  dispatch({ type: voteConstants.ID_VOTE_LOAD_REQUEST });
  await api.loadIdVote(id).then(
    response => {
      dispatch({ type: voteConstants.ID_VOTE_LOAD_SUCCESS, payload: response.data.data });
    },
    error => {
      dispatch({ type: voteConstants.ID_VOTE_LOAD_FAILURE, payload: error.toString() });
    },
  );
};

export const loadClosedIdVote = id => async dispatch => {
  dispatch({ type: voteConstants.CLOSED_ID_VOTE_LOAD_REQUEST });
  await api.loadIdVote(id).then(
    response => {
      dispatch({ type: voteConstants.CLOSED_ID_VOTE_LOAD_SUCCESS, payload: response.data.data });
    },
    error => {
      dispatch({ type: voteConstants.CLOSED_ID_VOTE_LOAD_FAILURE, payload: error.toString() });
    },
  );
};

export const uploadComment = (id, body) => async dispatch => {
  dispatch({ type: voteConstants.UPLOAD_COMMENT_REQUEST });
  await api.uploadComment(id, body).then(
    response => {
      dispatch({ type: voteConstants.UPLOAD_COMMENT_SUCCESS, payload: response.data.data });
    },
    error => {
      dispatch({ type: voteConstants.UPLOAD_COMMENT_FAILURE, payload: error.toString() });
    },
  );
};

export const deleteComment = id => async dispatch => {
  dispatch({ type: voteConstants.DELETE_COMMENT_REQUEST });
  await api.deleteComment(id).then(
    response => {
      if (response.data.success) {
        dispatch({ type: voteConstants.DELETE_COMMENT_SUCCESS, payload: id });
        alert('댓글을 삭제했습니다.');
      }
    },
    error => {
      dispatch({ type: voteConstants.DELETE_COMMENT_FAILURE, payload: error.toString() });
    },
  );
};

export const updateComment = (id, text) => async dispatch => {
  dispatch({ type: voteConstants.UPDATE_COMMENT_REQUEST });
  await api.updateComment(id, text).then(
    response => {
      if (response.data?.success) {
        dispatch({ type: voteConstants.UPDATE_COMMENT_SUCCESS, payload: { id, text } });
      }
    },
    error => {
      dispatch({ type: voteConstants.UPDATE_COMMENT_FAILURE, payload: error.toString() });
    },
  );
};
