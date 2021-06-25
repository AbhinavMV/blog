import axios from "axios";
export const registerUser = (formData) => {
  return axios.post(
    "https://poem-blog-app.herokuapp.com/api/auth/register",
    formData
  );
};

export const loginUser = (email, password) => {
  return axios.post("https://poem-blog-app.herokuapp.com/api/auth/login", {
    email,
    password,
  });
};

export const forgotpassword = (email) => {
  return axios.post("http://localhost:8000/api/auth/forgotpassword", { email });
};

export const resetPassword = (resetToken, password) => {
  return axios.put(
    `http://localhost:8000/api/auth/resetpassword/${resetToken}`,
    { password }
  );
};
