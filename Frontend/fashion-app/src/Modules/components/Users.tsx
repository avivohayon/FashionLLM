import React, { useEffect, useState } from "react";
import { UserAuthProps } from "../../Context/AuthProvider";
import { CreateDesign } from "../../Pages";
import useRefreshToken from "../../Hooks/useRefreshToken";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosError } from "axios";

const Users = () => {
  const [users, setUsers] = useState<[]>();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // use for cancel the request if the component un mounts
    const signal = controller.signal;
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/auth/protected/users", {
          // signal: signal,
        });

        // console.log("lllllllllllllllllll");
        // console.log(response.data.all_users);
        // console.log("lllllllllllllllllll");

        isMounted && setUsers(response.data.all_users);
      } catch (err) {
        navigate("/avivohayon/fashionai/login/", {
          state: { from: location },
          replace: true,
        });
      }
    };

    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>

      {users?.length ? (
        <ul>
          {users.map((userl, i) => (
            <li key={i}>{userl?.user}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <button onClick={() => refresh()}>Refresh</button>
      <br />
    </article>
  );
};

export default Users;
