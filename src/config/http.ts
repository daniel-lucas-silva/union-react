import axios from 'axios';
import {Paginated} from "../models/common";
import {IUser} from "../models/user";
import {IAuthLogin, IAuthLoginResponse} from "./interfaces";
import {store} from "../store";

const http = axios.create({
  baseURL: 'http://localhost:2019',
  timeout: 1000,
});

http.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "Bearer " + store.authStore.token;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);


const limit = (count: number, p: number) => `limit=${count}&offset=${p ? (p - 1) * count : 0}`;

export const Users = {
  all: (page: number, size = 10) =>
    http.get<Paginated<IUser>>(`/users?${limit(size, page)}`, { onDownloadProgress: console.log }),
  get: (id: number) =>
    http.get<IUser>(`/users/${id}`),
  create: (id: number) =>
    http.post(`/users`),
  update: (id: number) =>
    http.put(`/users/${id}`),
  delete: (id: number) =>
    http.delete(`/users/${id}`),
};

export const Auth = {
  login: (credentials: IAuthLogin) =>
    http.post<IAuthLoginResponse>('/auth', credentials, { data: 'test' })
};

export default http;
