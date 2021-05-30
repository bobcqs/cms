import axios from 'axios';
import { AES } from "crypto-js";
import { getAuthData } from "./storage";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

//axiosInstance.interceptors.request(请求拦截器)：请求发送前进行一些操作
axiosInstance.interceptors.request.use((config) => {
  if (!config.url.includes('login')) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: 'Bearer ' + storage?.token,
      },
    };
  }
  return config;
});

function post(path, requestBody) {
  return axiosInstance
    .post(path, requestBody)
    .then(response => {
      return new Promise(resolve => {
        resolve(response.data);
      });
    })
    .catch(error => {
      return new Promise((_resolve, reject) => {
        reject(error.response.data);
      });
    });
}

export function login(viewValues) {
  return post("/login", {
    email: viewValues.email,
    password: AES.encrypt(viewValues.password, process.env.NEXT_PUBLIC_AES_KEY).toString(),
    role: viewValues.role,
  });
};