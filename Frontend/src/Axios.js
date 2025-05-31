import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  localStorage.getItem("userToken");

export const Axios = async (data) => {
  try {
    const resData = await axios(data);
    console.log("axios", resData.data);
    return resData.data;
  } catch (err) {
    if (err.response.statusCode == 401) {
      localStorage.removeItem("userToken");
      window.href("/signup");
    }
    return err.response.data;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("userToken");
  return !!token;
};

export const setAuthenticated = (token) => {
  localStorage.setItem("userToken", token);
  axios.defaults.headers.common["Authorization"] = token;
};
