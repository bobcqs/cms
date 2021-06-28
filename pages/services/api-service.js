import axios from 'axios';
import { AES } from "crypto-js";

//使用自定义配置创建axios的新实例
const axiosInstance = axios.create({
  withCredentials: true,
    baseURL: 'https://cms.chtoma.com/api',
    responseType: 'json',
});

export const axiosInstanceAuthen = ()=>{
  return (
    axios.create({
    withCredentials: true,
    baseURL: 'https://cms.chtoma.com/api',
    responseType: 'json',
    headers:{
      "Authorization":
      `Bearer ${JSON.parse(localStorage?.getItem("key")).token}`
    }
  })
  )
} 

export const getStudents = async (query,page,limit) => {
  return (
      await axiosInstanceAuthen().get(`/students?query=${query}&page=${page}&limit=${limit}`)
      );
}

export const axiosPostLogout = async () => {
  return (
      await axiosInstanceAuthen().post('/logout')
  )
}
export function login(values) {
  return axios.post("/https://cms.chtoma.com/api/login", {
    email: values.email,
    password: AES.encrypt(values.password, 'cms').toString(),
    role: values.role,
  });
};

