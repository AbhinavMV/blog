import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import postsReducer from "./ducks/postsReducer";
import authReducer from "./ducks/userReducer";

const reducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
});
const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
