import {
  SET_COMUNIDADES,
  SET_DATA_USER,
  SET_DATA_JWT,
  SET_REACCIONES,
} from "./actions";

const initialState = {
  data: {},
  jwt: {},
  comunidades: {},
  reacciones: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMUNIDADES:
      return { ...state, comunidades: action.payload };

    case SET_DATA_USER:
      return { ...state, data: action.payload };
    case SET_DATA_JWT:
      return { ...state, jwt: action.payload };

    case SET_REACCIONES:
      return { ...state, reacciones: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
