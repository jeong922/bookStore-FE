import { SingupProps } from '../pages/Signup';
import { httpClient } from './http';

export const signup = async (userData: SingupProps) => {
  const response = await httpClient.post('/users/join', userData);
  return response.data;
};

export const resetRequest = async (data: SingupProps) => {
  const response = await httpClient.post('/users/reset', data);
  return response.data;
};

export const resetPassword = async (data: SingupProps) => {
  const response = await httpClient.put('/users/reset', data);
  return response.data;
};

interface LoginResponse {
  token: string;
}

export const login = async (data: SingupProps) => {
  const response = await httpClient.post<LoginResponse>('/users/login', data);
  return response.data;
};
