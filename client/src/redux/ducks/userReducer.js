import { loginUser, registerUser } from "../../api/userApi";

const initialState = {
  loading: false,
  error: null,
  authData: undefined,
};
const AUTH_REQUEST = "AUTH_REQUEST";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const LOGOUT = "LOGOUT";
const AUTH_ERROR = "AUTH_ERROR";

export const userAuth = (formData, isSignUp, history) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    let response = null;
    if (isSignUp) {
      response = await registerUser(formData);
    } else {
      response = await loginUser(formData.email, formData.password);
    }
    dispatch({ type: AUTH_SUCCESS, data: response.data });
    history.push("/");
  } catch (error) {
    dispatch({ type: AUTH_ERROR, error: error });
    setTimeout(() => dispatch({ type: LOGOUT }), 5000);
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, loading: true };
    case AUTH_SUCCESS:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data, error: null, loading: false };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: null };
    case AUTH_ERROR:
      return { ...state, authData: null, loading: false, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
