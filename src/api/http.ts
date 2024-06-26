import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../store/authStore';

const BASE_URL = 'http://localhost:8080';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const token = getToken();
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        removeToken();
        window.location.href = '/login';
        return;
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();

type requestMethod = 'get' | 'post' | 'put' | 'delete';

export const requestHandler = async <T>(
  method: requestMethod,
  url: string,
  payload?: T
) => {
  let response;

  switch (method) {
    case 'post':
      response = await httpClient.post(url, payload);
      break;
    case 'get':
      response = await httpClient.get(url, { params: payload });
      break;
    case 'put':
      response = await httpClient.post(url, payload);
      break;
    case 'delete':
      response = await httpClient.post(url);
      break;
  }

  return response.data;
};
