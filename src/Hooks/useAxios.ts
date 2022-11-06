import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseUrl = 'https://localhost:7122';

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

interface CustomAxiosResponse extends AxiosResponse {
  detail?: string,
}

const useAxios = (token: string) => {
  // const { token } = useContext(loggedUserContext);

  const post = (url: string, data: string | FormData, config?: AxiosRequestConfig): Promise<CustomAxiosResponse> => {
    return axios.post(baseUrl + url, data, {
      ...config,
      method: 'POST',
      headers: setAxiosHeaders(token)
    });
  };

  const get = (url: string, config?: AxiosRequestConfig) => {
    return axios.get(baseUrl + url, {
      ...config,
      method: 'GET',
      headers: setAxiosHeaders(token)
    });
  };

  // const cannot name 'delete' since delete is reserved keyword
  const remove = (url: string, config?: AxiosRequestConfig) => {
    return axios.delete(baseUrl + url, {
      ...config,
      method: 'DELETE',
      headers: setAxiosHeaders(token)
    });
  };

  return {
    post,
    get,
    delete: remove,
  };
};

export default useAxios;