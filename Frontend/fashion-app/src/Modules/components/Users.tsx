import React, { useEffect, useState } from "react";
import { UserAuthProps } from "../../Context/AuthProvider";
import { CreateDesign } from "../../Pages";
import useRefreshToken from "../../Hooks/useRefreshToken";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
const Users = () => {
  const [users, setUsers] = useState<[]>();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // use for cancel the request if the component un mounts
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/auth/users", {
          signal: controller.signal,
        });
        console.log("lllllllllllllllllll");
        console.log(response.data.all_users);
        console.log("lllllllllllllllllll");

        isMounted && setUsers(response.data.all_users);
      } catch (err) {
        console.log("eeeeeeeeeeeeeeeeeeee");
        console.log(err);
        console.log("eeeeeeeeeeeeeeeeeeee");
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
