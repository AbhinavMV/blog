import * as api from "../../api/postApi";

const initialState = {
  loading: false,
  error: null,
  posts: [],
  pagination: {},
  currentPost: {},
};

const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

const FETCH_CURRENT_POST = "FETCH_CURRENT_POST";

export const getPosts =
  (id = null, page = 1) =>
  async (dispatch) => {
    dispatch({
      type: FETCH_POSTS_REQUEST,
    });
    try {
      if (id === null) {
        const { data } = await api.getPosts(null, page);
        dispatch({
          type: FETCH_POSTS_SUCCESS,
          payload: data.posts,
          pagination: data.pageinationData,
        });
      } else {
        const { data } = await api.getPosts(id);
        dispatch({
          type: FETCH_CURRENT_POST,
          payload: data.posts,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_POSTS_FAILURE,
        error,
      });
    }
  };

export const likePost = (id) => {
  try {
  } catch (error) {}
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_POST:
      return { ...state, currentPost: action.payload };
    case FETCH_POSTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        pagination: action.pagination,
        posts: action.payload,
        currentPost: null,
      };
    case FETCH_POSTS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default postsReducer;
