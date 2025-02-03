import axios from "axios";

export const fetchApi = async (url: string) => {
  // use axios to fetch data from the API
  return axios({
    url: url,
    withCredentials: true,
  });
}