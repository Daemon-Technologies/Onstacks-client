import axios, { AxiosError, AxiosResponse } from "axios";

const handleSuccess = (
  res: AxiosResponse
): AxiosResponse | Promise<AxiosResponse> => res.data.data;
const handleError = (error: AxiosError) => {
  throw error;
};

const token = "base64verylongencodedjwttoken";
const BASE_URL = "https://staging.nowcast.homes";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(handleSuccess, handleError);
