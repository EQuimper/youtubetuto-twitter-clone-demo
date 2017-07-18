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
