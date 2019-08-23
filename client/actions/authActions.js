import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";
import axios from "axios";

//Check token and load user
//getState allows us to access part of our state. We use it here to get token from the state
//We want to call loadUser all the time to get constantly get user info as jwt is stateless so user info is not saved in server state
export const loadUser = () => (dispatch, getState) => {
  //User Loading --> sets isLoading to true
  dispatch({ type: USER_LOADING });

  // The three code blocks below are moved to a separate funciton because their functionality is required at differenct places
  // //Get token from local storage
  // const token = getState().auth.token; //gets token from state in authReducer

  // //Headers
  // const config = {
  //   headers: {
  //     "Content-type": "application/json"
  //   }
  // };

  // //if token, add to headers
  // if (token) {
  //   config.headers["x-auth-token"] = token;
  // }

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Setup config/headers and token
export const tokenConfig = getState => {
  //this getState is provided as an arg to tokenConfig wherever the funciton is called
  //Get token from local storage
  const token = getState().auth.token; //gets token from state in authReducer

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
