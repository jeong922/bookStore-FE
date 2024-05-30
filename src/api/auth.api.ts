import { SingupProps } from '../pages/Signup';
import { httpClient } from './http';

export const signup = async (userData: SingupProps) => {
  const response = await httpClient.post('/users/join', userData);

  return response.data;
};
