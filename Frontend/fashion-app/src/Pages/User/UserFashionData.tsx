import React, { useState } from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";
import { axiosPrivate } from "../../Hooks/axios";
import { CelebFashion, Item } from "../../types/models";
import { Container as ContainerBS } from "react-bootstrap";
import { Container as ContainerMUI, Button, Grid } from "@mui/material";
import FashionCards from "../../Modules/views/FashionCards";

function removeDuplicatedItems(celebFashion: CelebFashion): CelebFashion {
  const uniqueItems: { [name: string]: Item } = {}; // Dictionary to keep track of unique items

  for (const category in celebFashion) {
    if (Array.isArray(celebFashion[category])) {
      celebFashion[category] = (celebFashion[category] as Item[]).filter(
        (item) => {
          if (!uniqueItems[item.name]) {
            uniqueItems[item.name] = item;
            return true;
          }
          return false;
        }
      );
    }
  }

  return celebFashion;
}

export default function UserFashionData() {
  // this component renders the searched target clothes fashion
  const { id } = useParams() as any;
  const fashionData = useLoaderData() as CelebFashion;
  const filteredFashionData: CelebFashion = removeDuplicatedItems(fashionData);
  const service = id.split("_")[0];
  console.log(`service:: ${service}`);
  const firstSpaceIndex = id.indexOf(" ");

  const [selectedCategory, setSelectedCategory] = useState<string>("tops");

  //event handlers
  const handleCategoryButtonClick = (category: string) => {
    console.log("start handleCategoryButtonClick func");

    console.log(`CreateDesign click button ${category}`);
    setSelectedCategory(category);
  };

  return (
    <>
      <ContainerMUI style={{ marginTop: "2rem" }}>
        <Grid container spacing={2}></Grid>

        <>
          <ContainerBS
            style={{
              maxWidth: "150svh",
              display: "flex",
            }}
          >
            <div className="mb-3">
              <Button onClick={() => handleCategoryButtonClick("hat")}>
                Hats
              </Button>
              <Button onClick={() => handleCategoryButtonClick("glasses")}>
                Glasses
              </Button>

              <Button onClick={() => handleCategoryButtonClick("tops")}>
                Tops
              </Button>
              <Button onClick={() => handleCategoryButtonClick("pants")}>
                Pants
              </Button>
              <Button onClick={() => handleCategoryButtonClick("shoes")}>
                Shoes
              </Button>

              <Button onClick={() => handleCategoryButtonClick("jewelry")}>
                unique-accessories
              </Button>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Link to="/avivohayon/fashionai/profile">Back to Profile</Link>
              <br />
            </div>
          </ContainerBS>
          {console.log(
            `inside the data&& !loading data is: ${filteredFashionData.celebrity_name}`
          )}

          <FashionCards
            service_name={service}
            celebFashion={filteredFashionData}
            selectedCategory={selectedCategory}
          />
        </>
      </ContainerMUI>
    </>
  );
}

//loader function
export const fashionDataLoader = async ({ params }: any) => {
  const { id } = params;
  const firstSpaceIndex = id.indexOf(" ");
  const collectionName = id.slice(0, firstSpaceIndex);
  const targetName = id.slice(firstSpaceIndex + 1);
  console.log("origin is:", id);

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
