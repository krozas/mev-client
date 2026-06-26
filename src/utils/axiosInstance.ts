import axios, { AxiosError } from 'axios';
import config from "@config/config";

export const axiosInstance = axios.create({ baseURL: config.serverUrl });

export async function request<T = any>(apiEndpoint: string, params?: T) {
  return axiosInstance.post(apiEndpoint, params)
    .then((res) => res.data)
    .catch((error: AxiosError<any>) => {
      if (axios.isAxiosError(error)) { 
        throw error;
      } else { 
        throw new Error('different error than axios');
      }
    });
}
