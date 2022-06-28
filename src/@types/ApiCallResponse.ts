import { AxiosResponse, AxiosRequestConfig } from 'axios';

export interface ApiCallResponse {
  executeApiCall: (requestOptions: AxiosRequestConfig) => void;
  apiCallStatus: string;
  apiCallResponse: AxiosResponse | null;
  apiCallError: string | null;
}
