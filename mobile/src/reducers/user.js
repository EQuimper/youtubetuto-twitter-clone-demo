const initialState = {
  token: null,
  isAuthenticated: false,
  info: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.token,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'GET_USER_INFO':
      return {
        ...state,
        info: action.info,
      };
    default:
      return state;
  }
};
