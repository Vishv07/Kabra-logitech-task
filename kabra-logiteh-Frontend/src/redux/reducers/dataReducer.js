import {
  SET_PRODUCTS,
  LOADING_DATA,
  ADD_TO_CART,
  GET_CART,
  UPDATE_CART,
} from "../types";

const initialState = {
  products: [],
  cart: [],
  price: "",
  loading: false,
  addCartSuccess: null,
  deleteSuccessItem: null,
  orders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        loading: false,
        addCartSuccess: action.payload,
      };
      case GET_CART:
        return {
          ...state,
          loading: false,
          cart: action.payload,
        };
    default:
      return state;
  }
}
