import axios from 'axios';
import { AES } from "crypto-js";
import { getAuthData } from "./storage";

//使用自定义配置创建axios的新实例
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API || "http://localhost:3000/api",
});

//封装axios请求
function post(url, params) {
  return axiosInstance
    .post(url, params)
    //使用then方法添加回调函数, 回调一个以response为参数的箭头函数
    .then(res => {
      return new Promise(resolve => {
        resolve(res.data);
      });
    })
    .catch(error => {
      console.error(error);
    }); 
}

export function login(data) {
  return post("/new-page", {
    email: data.email,
    password: AES.encrypt(data.password, process.env.NEXT_PUBLIC_AES_KEY).toString(),
    role: data.role,
  });
};


