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
