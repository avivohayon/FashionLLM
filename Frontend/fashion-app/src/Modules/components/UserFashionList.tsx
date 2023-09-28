import React from "react";
import { axiosPrivate } from "../../Hooks/axios";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import styles from "./userinfo.module.css";
type FashionList = {
  [collectionName: string]: string[];
};

const UserFashionList = () => {
  const fashionList = useLoaderData() as FashionList;
  const listOfLists: string[][] = Object.keys(fashionList).map(
    (key) => fashionList[key]
  );
  console.log(listOfLists);

  return (
    <div className={styles.fashionlist}>
      UserFashionList
      {listOfLists.map((collectionList, index) => (
        <div key={index}>
          <h3>{Object.keys(fashionList)[index]}</h3>
          {collectionList.map((targetName, itemIndex) => (
            <Link
              to={
                Object.keys(fashionList)[index] + "%20" + targetName.toString()
              }
              key={itemIndex}
            >
              <p>{targetName}</p>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UserFashionList;

// loader function
export const fashionListLoader = async (): Promise<FashionList> => {
  try {
    const response = await axiosPrivate.get(
      "/user/avivohayon/fashionai/user-list"
    );
    console.log(response.data);
    return response.data as FashionList; // Return the JSON data
  } catch (error) {
    console.error("Error fetching fashion list:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};
