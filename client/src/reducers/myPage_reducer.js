import { myPageConstants } from '../constants/myPage_constant';

const initialState = {
  participatedVote: [],
  myGroup: [],
  request: false,
  error: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case myPageConstants.PARTICIPATED_VOTE_LOAD_REQUEST:
      return { ...state, request: true };
    case myPageConstants.PARTICIPATED_VOTE_LOAD_SUCCESS:
      return { ...state, participatedVote: action.payload.data, request: false };
    case myPageConstants.PARTICIPATED_VOTE_LOAD_FAILURE:
      return { ...state, error: action.payload };

    case myPageConstants.USER_GROUP_LOAD_REQUEST:
      return { ...state, request: true };
    case myPageConstants.USER_GROUP_LOAD_SUCCESS:
      return { ...state, myGroup: action.payload.data, request: false };
    case myPageConstants.USER_GROUP_LOAD_FAILURE:
      return { ...state, error: action.payload };

    case myPageConstants.USER_GROUP_LEAVE_REQUEST:
      return { ...state };
    case myPageConstants.USER_GROUP_LEAVE_SUCCESS:
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        myGroup: state.myGroup.filter(group => group._id !== action.payload),
        request: false,
      };
    case myPageConstants.USER_GROUP_LEAVE_FAILURE:
      return { ...state, error: action.payload, request: false };

    default:
      return state;
  }
}
