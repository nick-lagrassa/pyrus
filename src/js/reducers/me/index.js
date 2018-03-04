import { ME_SET_INFO } from "../../constants/me";

const initialState = {
  name: "",
  id: ""
};

export default function me(state = initialState, action) {
  switch (action.type) {
    case ME_SET_INFO:
      return {
        ...state,
        name: action.name,
        id: action.id
      };
    default:
      return state;
  }
}
