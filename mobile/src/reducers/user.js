const initialState = {
  token: null,
  isAuthenticated: false,
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
    default:
      return state;
  }
};
