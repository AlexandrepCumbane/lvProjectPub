const initialState = {
  userInfo: undefined,
  config: undefined,
  csrftoken: undefined,
  success: false,
  failed: false,
  loading: false,
  userRole: "Not-auth",
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN": {
      return {
        ...state,
        userInfo: undefined,
        success: false,
        failed: false,
        loading: false,
      };
    }
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        userInfo: action.userInfo,
        config: action.config,
        csrftoken: action.csrftoken,
        success: true,
        failed: false,
        loading: false,
        userRole: action.userRole,
      };
    }
    case "LOGIN_FAILED": {
      return {
        ...state,
        userInfo: action.userInfo,
        success: false,
        failed: true,
        loading: false,
      };
    }

    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole };
    }
    case "UPDATE_TOKEN": {
      return { ...state, csrftoken: action.csrftoken };
    }
    default: {
      return state;
    }
  }
};
