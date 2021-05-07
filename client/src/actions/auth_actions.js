import { authConstants } from '../constants/auth_constants';
import * as api from '../api/api';
import { history } from '../util/history';

export const signIn = data => async dispatch => {
  dispatch({ type: authConstants.SIGNIN_REQUEST });
  try {
    const response = await api.signIn(data);
    if (response.data && response.data.loginSuccess) {
      await api.getUserProfile().then(() => {
        alert('로그인이 완료되었습니다.');
        history.push('/');
        dispatch({ type: authConstants.SIGNIN_SUCCESS, payload: response.data });
      });
    }
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
