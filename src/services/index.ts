import axios, { AxiosRequestConfig } from 'axios';

export type ApiParams = {
  retries?: number,
  errorHandler?: (error: any) => any,
} & AxiosRequestConfig<any>;

/**
 * Generic API Handler Function
 * @param url - The URL for the API request
 * @param {ApiParams} params - The URL and configuration for the API request
 * @returns {Promise<any>} - The API response or an error message
 * @throws {error} - The error from axios if the request fails
 */
export const api = async (url: string, params: ApiParams): Promise<any> => {
  let retriesLeft = params.retries || 1;
  
  while(retriesLeft > 0) {
    try {
      const response = await axios(url, params);
      return response.data;
    } catch (error: any) {
      if (params.errorHandler) {
        return params.errorHandler(error);
      } else {
        retriesLeft--;
      }
      
      console.error(`Retrying in 3 seconds, ${retriesLeft} retries left`, error);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (retriesLeft === 0) {
        throw error;
      }
    }
  }
};