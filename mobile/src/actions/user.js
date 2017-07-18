import { AsyncStorage } from 'react-native';

export function login() {
  return {
    type: 'LOGIN',
  };
}

export function getUserInfo(info) {
  return {
    type: 'GET_USER_INFO',
    info,
  };
}

export function logout() {
  return async dispatch => {
    try {
      await AsyncStorage.removeItem('@twitterclonedemo:token');
      return dispatch({
        type: 'LOGOUT',
      });
    } catch (e) {
      throw e;
    }
  };
}
