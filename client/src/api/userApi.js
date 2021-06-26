import axios from "axios";

const API = axios.create({ baseURL: "https://poem-blog-app.herokuapp.com" });

export const registerUser = (formData) => {
  return API.post("/api/auth/register", formData);
};

export const loginUser = (email, password) => {
  return API.post("/api/auth/login", {
    email,
    password,
  });
};

export const forgotpassword = (email) => {
  return API.post("/api/auth/forgotpassword", { email });
};

export const resetPassword = (resetToken, password) => {
  return API.put(`/api/auth/resetpassword/${resetToken}`, { password });
};
