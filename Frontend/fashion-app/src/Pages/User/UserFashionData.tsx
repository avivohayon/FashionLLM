import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { axiosPrivate } from "../../Hooks/axios";
import { CelebFashion } from "../../types/models";
export default function UserFashionData() {
  const { id } = useParams();
  const fashionData = useLoaderData() as CelebFashion;
  return (
    <div>
      UserFashionData
      <h2>Fashion Data: </h2>
      <p>{fashionData.celebrity_name}</p>
      <div>
        <p>{fashionData.conclusion}</p>
      </div>
    </div>
  );
}

//loader function
export const fashionDataLoader = async ({ params }: any) => {
  const { id } = params;
  const firstSpaceIndex = id.indexOf(" ");
  const collectionName = id.slice(0, firstSpaceIndex);
  const targetName = id.slice(firstSpaceIndex + 1);

  console.log("Collection Name:", collectionName);
  console.log("Target Name:", targetName);

  try {
    const response = await axiosPrivate.get(
      `/user/avivohayon/fashionai/user-fashion?target_name=${targetName}&collection_name=${collectionName}`
    );
    console.log(response.data);
    return response.data as CelebFashion; // Return the JSON data
  } catch (error) {
    console.error("Error fetching fashion CelebFashion:", error);
    throw error;
  }
};
