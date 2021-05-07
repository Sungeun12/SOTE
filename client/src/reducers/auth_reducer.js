import { authConstants } from '../constants/auth_constants';

export default function (state = { loggedIn: false, user: null }, action) {
  switch (action.type) {
    case authConstants.SIGNIN_REQUEST:
      return { ...state, loggedIn: true };
    case authConstants.SIGNIN_SUCCESS:
      return { ...state, loggedIn: true, user: action.payload };
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
