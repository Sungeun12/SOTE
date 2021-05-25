import { voteConstants } from '../constants/vote_constants';

const initialState = {
  voteList: [],
  request: false,
  error: false,
  currentVote: { title: '', startDate: '', endDate: '' },
  currentOptions: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case voteConstants.ALL_VOTE_LOAD_REQUEST:
      return { ...state, request: true };
    case voteConstants.ALL_VOTE_LOAD_SUCCESS:
      return { ...state, voteList: action.payload, request: false };
    case voteConstants.ALL_VOTE_LOAD_FAILURE:
      return { ...state, error: true };

    case voteConstants.UNLOAD_VOTE:
      return { ...state, voteList: [], currentOptions: [], currentVote: null, request: false };

    case voteConstants.ID_VOTE_LOAD_REQUEST:
      return { ...state, request: true };
    case voteConstants.ID_VOTE_LOAD_SUCCESS:
      return {
        ...state,
        currentVote: action.payload,
        currentOptions: action.payload.options,
        request: false,
      };
    case voteConstants.ID_VOTE_LOAD_FAILURE:
      return { ...state, error: true };
    default:
      return state;
  }
}
