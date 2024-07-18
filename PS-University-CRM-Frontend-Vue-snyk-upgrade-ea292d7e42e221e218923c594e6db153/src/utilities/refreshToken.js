// @/src/common/refreshToken.js
import mem from "mem";
import axios from "axios";

// import { get } from "@/api/client";

const HTTP = axios.create({
  baseURL: `https://crm.paramountstudents.com/university/`,
  headers: {
    "Content-Type": "application/json",
    // Authorization: user ? `Bearer ${user}` : "",
    Accept: "*/*",
  },
});

HTTP.interceptors.request.use((config) => {
  const user = localStorage.getItem("userToken");
  // console.log(user);

  if (user) {
    config.headers = {
      ...config.headers,
      Authorization: user ? `Bearer ${user}` : "",
    };
  }

  return config;
});

const refreshTokenFn = async () => {
  const userInfo = JSON.parse(localStorage.getItem("session"));

  console.log(userInfo);

  try {
    const response = await HTTP.post("login_uv", {
      unique_id: userInfo.id,
      password: userInfo.password,
    });

    const data = response.data;
    console.log(data);

    if (!data) {
      localStorage.removeItem("session");
      localStorage.removeItem("user");
    }

    localStorage.setItem("user", data);

    return data;
  } catch (error) {
    localStorage.removeItem("session");
    localStorage.removeItem("user");
    console.log(error);
    return false;
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
