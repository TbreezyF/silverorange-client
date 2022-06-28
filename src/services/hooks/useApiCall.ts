import { useState } from 'react';

//LIBS
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

//TYPES
import { ApiCallResponse } from '../../@types/ApiCallResponse';

export const useApiCall = (): ApiCallResponse => {
  const [status, setStatus] = useState<string>('idle');

  const [value, setValue] = useState<AxiosResponse | null>(null);

  const [error, setError] = useState<string | null>(null);

  const http = axios.create({
    baseURL: 'localhost:4000',
    validateStatus: (statusCode: number) => {
      return statusCode >= 200;
    },
    withCredentials: true,
  });

  const execute = (requestOptions: AxiosRequestConfig) => {
    setStatus('pending');

    setValue(null);

    setError(null);

    (async () => {
      try {
        const response = await http(requestOptions);

        setValue(response);

        setStatus('success');
      } catch (err) {
        setError(
          'An unexpected network error occurred, please try again later.'
        );

        setStatus('error');
      }
    })();
  };

  return {
    executeApiCall: execute,
    apiCallStatus: status,
    apiCallResponse: value,
    apiCallError: error,
  };
};
