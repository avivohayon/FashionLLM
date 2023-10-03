import React from "react";
import { axiosPrivate } from "../../Hooks/axios";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { Container as ContainerMUI } from "@mui/material";

import styles from "./userinfo.module.css";
type FashionList = {
  [collectionName: string]: string[];
};
type UserName = {
  [username: string]: string;
};

type UserProfileElements = {
  username: string;
  fashionList: FashionList;
};
const UserFashionList = () => {
  const userProfileElements = useLoaderData() as UserProfileElements;
  const userName = userProfileElements.username;
  const fashionList = userProfileElements.fashionList;
  // console.log(`ggigigig: ${userName}`);
  const listOfLists: string[][] = Object.keys(fashionList).map(
    (key) => fashionList[key]
  );
  // console.log(fashionList);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.fashionlist}>
      <h1>Hello again {userName}</h1>
      <h4>You can re-use any of your previous search history here!</h4>
      {listOfLists.map((collectionList, index) => (
        <ContainerMUI key={index}>
          <h3>{Object.keys(fashionList)[index].replace(/_/g, " ")}</h3>
          {collectionList.map((targetName, itemIndex) => (
            <Link
              to={
                Object.keys(fashionList)[index] + "%20" + targetName.toString()
              }
              key={itemIndex}
              onClick={handleClick}
            >
              <p>{targetName}</p>
            </Link>
          ))}
        </ContainerMUI>
      ))}
    </div>
  );
};

export default UserFashionList;

// loader function
export const fashionListLoader = async (): Promise<UserProfileElements> => {
  try {
    const response = await axiosPrivate.get(
      "/user/avivohayon/fashionai/user-list"
    );
    // console.log(response.data);
    const { username, fashion_list } = response.data;

    const userData: UserProfileElements = {
      username: username.username,
      fashionList: fashion_list,
    };
    console.log(`lalalala : ${JSON.stringify(userData)}`);
    return userData; // Return the JSON data
  } catch (error) {
    console.error("Error fetching fashion list:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};
