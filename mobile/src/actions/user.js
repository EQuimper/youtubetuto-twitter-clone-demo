import { NavigationActions } from 'react-navigation';

export function login() {
  return {
    type: 'LOGIN',
  };
}

export function getUserInfo(info) {
  return dispatch => {
    dispatch(NavigationActions.setParams({ params: { avatar: info.avatar }, key: 'Home' }));
    return dispatch({
      type: 'GET_USER_INFO',
      info,
    });
  };
}
