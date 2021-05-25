import { authConstants } from '../constants/auth_constants';

export default function (
  state = { loggedIn: false, user: null, request: false, name: '김눈송', userPic: '' },
  action,
) {
  switch (action.type) {
    case authConstants.SIGNUP_REQUEST:
      return { ...state, request: true };
    case authConstants.SIGNUP_SUCCESS:
      return { ...state };
    case authConstants.SIGNUP_FAILURE:
      return { ...state };
    case authConstants.SIGNIN_REQUEST:
      return { ...state, loggedIn: true, request: true };
    case authConstants.SIGNIN_SUCCESS:
      return { ...state, loggedIn: true, user: action.payload, request: false };
    case authConstants.SIGNIN_FAILURE:
      return { ...state, loggedIn: false };
    case authConstants.SET_USER_TEMP:
      return { ...state, loggedIn: true, user: action.payload };
    case authConstants.LOGOUT:
      return { ...state, loggedIn: false, user: null };
    default:
      return state;
  }
}
