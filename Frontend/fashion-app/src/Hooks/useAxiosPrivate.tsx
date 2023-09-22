import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import axios, { AxiosError } from "axios";

const useAxiosPrivate = () => {
  // this component will mange and attache the api request calls to the backend with the jwt token
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  // console.log(auth);
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // check if first attempt, not a re-try
        if (!config.headers["Authorization"]) {
          console.log("NOT A RE TRY");
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        // if not first time we know we already refresh the token after a retry (403) in the response Interceptor
        return config;
      },
      (error) => Promise.reject(error)
    );

    //attache response interceptor
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) =>
        //  response,
        {
          console.log("Response Data:", response.data);
          return response;
        },
      async (error) => {
        // console.error(error);
        if (axios.isCancel(error)) {
          console.log("Request was canceled:", error.message);
          // Optionally, you can handle or ignore canceled requests here
          return Promise.reject(error); // or any other handling as needed
        }
        const prevRequest = error?.config;
        console.log("error?.response.status");

        // console.log(error.response.status);

        if (error?.response.status === 401 && !prevRequest?.sent) {
          console.log(
            "inside IF : error?.response.status === 401 && !prevRequest?.sent"
          );

          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        } else {
          console.log("01010101101010");
          console.error(error);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
