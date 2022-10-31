import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseUrl = 'https://localhost:7122';

const getHeaders = (token: string) => ({
  'Content-Type': 'application/json; charset=utf-8',
  'Accept': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${token}`,
});

interface CustomAxiosResponse extends AxiosResponse {
  detail?: string,
}

const useAxios = (token: string) => {
  // const { token } = useContext(loggedUserContext);

  const post = (url: string, data: string | FormData, config?: AxiosRequestConfig): Promise<CustomAxiosResponse> => {
    return axios.post(baseUrl + url, data, {
      ...config,
      method: 'POST',
      headers: getHeaders(token)
    });
  };

  const get = (url: string, config?: AxiosRequestConfig) => {
    return axios.get(baseUrl + url, {
      ...config,
      method: 'GET',
      headers: getHeaders(token)
    });
  };

  // const cannot name 'delete' since delete is reserved keyword
  const remove = (url: string, config?: AxiosRequestConfig) => {
    return axios.delete(baseUrl + url, {
      ...config,
      method: 'DELETE',
      headers: getHeaders(token)
    });
  };

  return {
    post,
    get,
    delete: remove,
  };
};

export default useAxios;