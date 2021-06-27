import axios from "axios";

// const API = axios.create({ baseURL: "https://poem-blog-app.herokuapp.com" });
const API = axios.create({ baseURL: "http://localhost:8000/" });

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

export const updateUser = (id, body) => {
  return API.patch(`api/auth/update/${id}`, body, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`,
    },
  });
};
export const deleteUser = (id) => {
  return API.delete(`api/auth/deleteuser/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`,
    },
  });
};
