import { authConstants } from '../constants/auth_constants';
import * as api from '../api/auth';
import { history } from '../util/history';

export const signUp = data => async dispatch => {
  dispatch({ type: authConstants.SIGNUP_REQUEST });
  try {
    const response = await api.signUp(data);
    alert('인증을 완료해주세요');
    history.push('/auth');
    dispatch({ type: authConstants.SIGNUP_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({
      type: authConstants.SIGNUP_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};
export const signIn = (email, password) => async dispatch => {
  dispatch({ type: authConstants.SIGNIN_REQUEST });
  try {
    const response = await api.signIn(email, password);
    alert('로그인이 완료되었습니다.');
    history.push('/');
    dispatch({ type: authConstants.SIGNIN_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({
      type: authConstants.SIGNIN_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

export const setUserTemp = () => async dispatch => {
  try {
    const response = await api.getUserProfile();
    dispatch({ type: authConstants.SET_USER_TEMP, payload: response.data });
  } catch (e) {
    dispatch({
      payload: e,
      error: true,
    });
    throw e;
  }
};
export const logout = () => async dispatch => {
  try {
    await api.logout();
    history.push('/login');
    dispatch({ type: authConstants.LOGOUT });
  } catch (e) {
    dispatch({
      payload: e,
      error: true,
    });
  }
};
