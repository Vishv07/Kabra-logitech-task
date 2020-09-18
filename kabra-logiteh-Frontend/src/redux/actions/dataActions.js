import {
  SET_PRODUCTS,
  LOADING_DATA,
  ADD_TO_CART, GET_CART
} from "../types";
import axios from "../../Services/axios";


export const getProducts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/getProducts")
    .then((res) => {
      console.log(res);
      dispatch({
        type: SET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_PRODUCTS,
        payload: [],
      });
    });
};
export const getCart = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/getCart")
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_CART,
        payload: [],
      });
    });
};
export const addItem = (productID, count) => (dispatch) => {
  // dispatch({ type: LOADING_DATA });
  axios
    .post(`/addTocart`,{
      productID:productID,
      count:1
    })
    .then((res) => {
      console.log(res);
      axios
      .get("/getCart")
      .then((res) => {
        console.log(res);
        dispatch({
          type: GET_CART,
          payload: res.data,
        });
    })
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_PRODUCTS,
        payload: [],
      });
    });
};
export const updateCart = (id,count) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .put("/updateCart",{
      productID:id,
      count:count
    })
    .then((res) => {
      console.log(res);
      axios
      .get("/getCart")
      .then((res) => {
        console.log(res);
        dispatch({
          type: GET_CART,
          payload: res.data,
        });
    })
    })
    .catch((err) => {
      console.log(err);
      // dispatch({
      //   type: GET_CART,
      //   payload: [],
      // });
    });
};

// export const fetchRestaurant = (restId) => (dispatch) => {
//   dispatch({ type: LOADING_DATA });
//   axios
//     .get(`/restaurant/${ restId }`)
//     .then((res) => {
//       dispatch({
//         type: SET_PRODUCTS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: SET_RESTAURANT,
//         payload: {},
//       });
//     });
// };

// export const addItem = (itemData) => (dispatch) => {
//   dispatch({ type: LOADING_UI });
//   axios
//     .post(`/seller/create-item`, itemData)
//     .then((res) => {
//       dispatch({
//         type: ADD_ITEM,
//         payload: res.data.item,
//       });
//       dispatch({ type: CLEAR_ERRORS });
//     })
//     .catch((err) => {
//       console.log(err.response.data);
//       if (err.response) {
//         dispatch({
//           type: SET_ERROR_ITEM,
//           payload: err.response.data,
//         });
//       } else {
//         dispatch({
//           type: SERVER_ERROR,
//         });
//       }
//     });
// };


// export const ChangeSignup = (name) => {
//   return dispatch => {
//     dispatch({ type: CHANGE_SIGNUP, payload: { name: name} });
   
//   }
// }