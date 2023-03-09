import { AuthContext } from './../Contexts/AuthContext';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useContext } from 'react';

const baseUrl = process.env.REACT_APP_API_URL;
if (!baseUrl) throw new Error('Could not find `API_URL` in `.env`');

type AxiosHeadersType = {
  'Content-Type': string,
  Accept: string,
  Authorization?: string,
};

export const setAxiosHeaders = (token?: string) => {
  const headers: AxiosHeadersType = {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json; charset=utf-8',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export interface CustomAxiosResponse<T> extends AxiosResponse<T> {
  detail?: string,
}

const useAxios = () => {
  const { token } = useContext(AuthContext);

  const post = <T>(url: string, data: string | FormData, config?: AxiosRequestConfig): Promise<CustomAxiosResponse<T>> => {
    return axios.post(baseUrl + url, data, {
      ...config,
      method: 'POST',
      headers: setAxiosHeaders(token)
    });
  };

  const get = <T>(url: string, config?: AxiosRequestConfig): Promise<CustomAxiosResponse<T>> => {
    return axios.get(baseUrl + url, {
      ...config,
      method: 'GET',
      headers: setAxiosHeaders(token)
    });
  };

  const patch = <T>(url: string, data: string | FormData, config?: AxiosRequestConfig): Promise<CustomAxiosResponse<T>> => {
    return axios.patch(baseUrl + url, data, {
      ...config,
      method: 'PATCH',
      headers: setAxiosHeaders(token)
    });
  };

  // const cannot name 'delete' since delete is reserved keyword
  const remove = (url: string, config?: AxiosRequestConfig): Promise<CustomAxiosResponse<boolean>> => {
    return axios.delete(baseUrl + url, {
      ...config,
      method: 'DELETE',
      headers: setAxiosHeaders(token)
    });
  };

  return {
    post,
    get,
    patch,
    delete: remove,
  };
};

export default useAxios;