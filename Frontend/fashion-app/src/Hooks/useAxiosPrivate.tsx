import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  // this component will mange and attache the api request calls to the backend with the jwt token
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // check if first attempt, not a re-try
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        // if not first time we know we already refresh the token after a retry (403) in the response Interceptor
        return config;
      },
      (error) => Promise.reject(error)
    );

    //attache response interceptor
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,

      async (error) => {
        const prevRequest = error?.config;
        console.log("error?.response.status");

        console.log(error.response.status);
        console.log("error?.response.status2");

        if (error?.response.status === 401 && !prevRequest?.sent) {
          console.log(
            "inside IF : error?.response.status === 401 && !prevRequest?.sent"
          );

          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
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
