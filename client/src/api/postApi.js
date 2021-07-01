import axios from "axios";

// const API = axios.create({ baseURL: "https://poem-blog-app.herokuapp.com/" });

const API = axios.create({ baseURL: "http://localhost:8000/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }
  return req;
});

export const getPosts = (id, page) => {
  if (id) return API.get(`/api/posts?post=${id}`);
  else return API.get(`/api/posts?page=${page}`);
};

export const addPosts = (formData) => {
  return API.post("/api/posts/addpost", formData);
};

export const updatePost = (formData) => {
  return API.patch("/api/posts/updatepost", formData);
};

export const deletePost = (id) => {
  return API.delete(`/api/posts/deletepost`, {
    data: { id },
  });
};

export const likePost = (user, id) => {
  return API.patch(`/api/posts/${id}/likepost`, {
    id: user.result?._id || user.result?.googleId,
  });
};

export const getComments = (id) => {
  return API.get(`/api/comment/${id}`);
};

export const postComment = (user, id, message) => {
  return API.post(`/api/comment/${id}`, {
    message,
    commentor: user
      ? JSON.stringify({
          username: user.result.name,
          avatar: user.result.imageUrl ? undefined : user.result.imageUrl,
          userId: user.result._id ? user.result._id : user.result.googleId,
        })
      : JSON.stringify({
          username: "Anonymous",
          avatar: null,
          userId: "Anonymous",
        }),
  });
};
