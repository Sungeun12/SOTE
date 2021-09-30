import { voteConstants } from '../constants/vote_constants';

const initialState = {
  voteList: [],
  request: false,
  error: false,
  currentVote: { title: '', startDate: '', endDate: '' },
  currentOptions: [],
  comments: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case voteConstants.ALL_VOTE_LOAD_REQUEST:
      return { ...state, request: true };
    case voteConstants.ALL_VOTE_LOAD_SUCCESS:
      return { ...state, voteList: action.payload.data, request: false };
    case voteConstants.ALL_VOTE_LOAD_FAILURE:
      return { ...state, error: true };

    case voteConstants.UNLOAD_VOTE:
      return { ...state, voteList: [], currentOptions: [], currentVote: null, request: false };

    case voteConstants.ID_VOTE_LOAD_REQUEST:
      return { ...state, request: true };
    case voteConstants.ID_VOTE_LOAD_SUCCESS:
      return {
        ...state,
        currentVote: action.payload.vote,
        currentOptions: action.payload.vote.options,
        request: false,
      };
    case voteConstants.ID_VOTE_LOAD_FAILURE:
      return { ...state, error: true };

    case voteConstants.CLOSED_ID_VOTE_LOAD_REQUEST:
      return { ...state, request: true };
    case voteConstants.CLOSED_ID_VOTE_LOAD_SUCCESS:
      return {
        ...state,
        currentVote: action.payload.vote,
        currentOptions: action.payload.vote.options,
        comments: action.payload.comments,
        request: false,
      };
    case voteConstants.CLOSED_ID_VOTE_LOAD_FAILURE:
      return { ...state, error: true };

    case voteConstants.UPLOAD_COMMENT_REQUEST:
      return { ...state, request: true };
    case voteConstants.UPLOAD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.concat(action.payload),
        request: false,
      };
    case voteConstants.UPLOAD_COMMENT_FAILURE:
      return { ...state, error: true };

    case voteConstants.DELETE_COMMENT_REQUEST:
      return { ...state, request: true };
    case voteConstants.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === action.id ? { ...comment, isDeleted: false } : comment,
        ),
      };
    case voteConstants.DELETE_COMMENT_FAILURE:
      return { ...state, error: true };

    default:
      return state;
  }
}
