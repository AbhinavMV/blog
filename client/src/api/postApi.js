import axios from "axios";

// const API = axios.create({ baseURL: "https://poem-blog-app.herokuapp.com/" });
const API = axios.create({ baseURL: "http://localhost:8000/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
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
