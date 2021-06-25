import { loginUser, registerUser } from "../../api/userApi";

const initialState = {
  loading: false,
  error: null,
  authData: undefined,
};

const AUTH = "AUTH";
const LOGOUT = "LOGOUT";
const ERROR = "ERROR";

export const userAuth = (formData, isSignUp, history) => async (dispatch) => {
  try {
    let response = null;
    if (isSignUp) {
      response = await registerUser(formData);
    } else {
      response = await loginUser(formData.email, formData.password);
    }
    dispatch({ type: AUTH, data: response.data });
    history.push("/");
  } catch (error) {
    dispatch({ type: ERROR, error: error.response.data.error });
    setTimeout(() => dispatch({ type: LOGOUT }), 5000);
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data, error: null };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, error: null };
    case ERROR:
      return { ...state, authData: null, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
