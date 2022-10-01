import { initialState } from "./useContext";

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      return { user: action.payload };
    default:
      return state;
  }
};
