const initialState = {
  list: [],
  dropdowns: [],

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
        error: "",
      };
    }
    case "FORM_SUCCESS": {
      let stat = {
        ...state,
        list: [],
        success: true,
        failed: false,
        loading: false,
      };

      stat[action.data.key] = action.data.value;

      return stat;
    }
    case "FORM_FAILED": {
      return {
        ...state,
        success: false,
        failed: true,
        loading: false,
        list: [],
        error: action.error,
      };
    }
    case "DROPDOWNS": {
      return {
        ...state,
        dropdowns: action.dropdowns,
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
