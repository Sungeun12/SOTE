import * as api from '../api/vote';
import { voteConstants } from '../constants/vote_constants';

export const loadAllVote = (category, closed) => async dispatch => {
  dispatch({ type: voteConstants.ALL_VOTE_LOAD_REQUEST });
  try {
    const response = await api.loadVote(category, closed);
    dispatch({ type: voteConstants.ALL_VOTE_LOAD_SUCCESS, payload: response.data.data });
  } catch (e) {
    dispatch({
      type: voteConstants.ALL_VOTE_LOAD_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

export const unloadVote = () => ({ type: voteConstants.UNLOAD_VOTE });

export const loadIdVote = id => async dispatch => {
  dispatch({ type: voteConstants.ID_VOTE_LOAD_REQUEST });
  try {
    await api.loadIdVote(id).then(response =>
      dispatch({ type: voteConstants.ID_VOTE_LOAD_SUCCESS, payload: response.data.data }, error => {
        dispatch({
          type: voteConstants.ID_VOTE_LOAD_FAILURE,
          payload: error,
          error: true,
        });
      }),
    );
  } catch (e) {
    dispatch({
      type: voteConstants.ID_VOTE_LOAD_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};
