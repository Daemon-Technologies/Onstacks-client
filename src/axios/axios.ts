import axios, { AxiosError, AxiosResponse } from "axios";

const handleSuccess = (
  res: AxiosResponse
): AxiosResponse | Promise<AxiosResponse> => res.data.data;
const handleError = (error: AxiosError) => {
  throw error;
};

export const instance = axios.create({
  baseURL: "https://api.stxmining.club/api/v2/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const explorerInstance = axios.create({
  baseURL: "https://explorer-api.onstacks.com/api/explorer/",
  headers: {
    "Content-Type": "application/json",
  },
});

explorerInstance.interceptors.response.use(handleSuccess, handleError);
instance.interceptors.response.use(handleSuccess, handleError);
