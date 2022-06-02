import { AxiosRequestConfig } from 'axios';
import { requestExecutorCreator } from './helpers';
import {
  API_DEFAULT_REQUEST_HEADERS,
  BASE_URL,
  LS_TOKEN_KEY_NAME,
  TOKEN,
} from './config';

const requestExecutor = requestExecutorCreator(
  BASE_URL,
  API_DEFAULT_REQUEST_HEADERS,
  false,
);

export const getToken = async (): Promise<string> => {
  // const requestConfig: AxiosRequestConfig = {
  //   url: '/auth',
  //   params: {
  //     user: 'USERNAME',
  //   },
  // };
  // const response = await requestExecutor(requestConfig);
  //
  // const token = response.headers.authorization;
  // if (!token) {
  //   throw new Error('get error token: token is empty!');
  // }

  localStorage.setItem(LS_TOKEN_KEY_NAME, TOKEN);
  return '';
};
