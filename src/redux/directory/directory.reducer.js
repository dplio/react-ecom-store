// import { directoryActionTypes } from "./directory.types";
// import { addItemToCart, removeItemFromCart } from "./directory.utils";
import { sections } from "../../components/directory/directory.data.js";

const INITIAL_STATE = {
  sections: sections,
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
