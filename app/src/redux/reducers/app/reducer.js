const initialState = {
  list: [],
  dropdowns: [],

  success: false,
  failed: false,
  loading: false,

  updated_lvforms: false,
  updated_articles: false,
  updated_tasks: false,
  updated_users: false,
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

    case "UPDATE_LOAD_STATE": {
      let stateBk = {
        ...state,
      };

      stateBk[`updated_${action.payload.key}`] = action.payload.data;
      return stateBk;
    }

    case "RESTORE_LOAD": {
      return {
        ...state,
        updated_lvforms: false,
        updated_articles: false,
        updated_tasks: false,
        updated_users: false,
      };
    }

    default: {
      return state;
    }
  }
};
