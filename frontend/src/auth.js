import API from "./api";

// register user
export const registerUser = async (userData) => {
  return API.post("/auth/register", userData);
};

// login user
export const loginUser = async (userData) => {
  return API.post("/auth/login", userData);
};
