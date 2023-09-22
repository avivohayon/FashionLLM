import axios from "./axios";
import useAuth from "./useAuth";
import { UserAuthProps } from "../Context/AuthProvider";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    const empty_data: UserAuthProps = {
      username: "",
      password: "",
      accessToken: "",
      refreshToken: "",
      roles: [],
    };
    setAuth((prev) => {
      return { ...prev, ...empty_data };
    });

    try {
      const response = await axios("/auth/logout", { withCredentials: true });
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
