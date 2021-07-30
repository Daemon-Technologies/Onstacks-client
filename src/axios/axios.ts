import axios, { AxiosError, AxiosResponse } from "axios";

const handleSuccess = (
  res: AxiosResponse
): AxiosResponse | Promise<AxiosResponse> => res.data.data;
const handleError = (error: AxiosError) => {
  throw error;
};

const instance = axios.create({
  baseURL: "https://api.stxmining.club/api/v2/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(handleSuccess, handleError);

export default instance;
