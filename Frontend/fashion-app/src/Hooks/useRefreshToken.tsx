import { AxiosError } from "axios";
import { UserAuthProps } from "../Context/AuthProvider";
import axios from "./axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("auth/refresh", {
        withCredentials: true,
      });
      setAuth((prev) => {
        console.log(JSON.stringify(prev.accessToken));
        console.log(response.data.access_token);
        return { ...prev, accessToken: response.data.access_token };
      });
      return response.data.access_token;
    } catch (err) {
      if ((err as AxiosError).isAxiosError) {
        const axiosError = err as AxiosError;
        console.error("Axios Error Response Data:", axiosError.response?.data);
        console.error("Axios Error Message:", axiosError.message);
      } else {
        console.error("Unexpected Error:", err);
      }
      // Rethrow the error to handle it further if needed
      throw err;
    }
  };

  return refresh;
};

export default useRefreshToken;
