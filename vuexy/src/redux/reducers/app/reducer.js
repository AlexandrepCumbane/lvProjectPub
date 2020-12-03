const initialState = {
  list: [],
  success: false,
  failed: false,
  loading: false,
};

export const app_reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_FORM": {
      return {
        ...state,
        success: false,
        failed: false,
        loading: false,
      };
    }
    case "FORM_SUCCESS": {
      return {
        ...state,
        list: action.list,
        success: true,
        failed: false,
        loading: false,
      };
    }
    case "FORM_FAILED": {
      return {
        ...state,
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
