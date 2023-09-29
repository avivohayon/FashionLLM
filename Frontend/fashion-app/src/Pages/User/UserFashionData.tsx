import React, { useState } from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";
import { axiosPrivate } from "../../Hooks/axios";
import { CelebFashion } from "../../types/models";
import { Container as ContainerBS } from "react-bootstrap";
import { Container as ContainerMUI, Button, Grid } from "@mui/material";
import FashionCards from "../../Modules/views/FashionCards";

export default function UserFashionData() {
  // this component renders the searched target clothes fashion
  const { id } = useParams() as any;
  const fashionData = useLoaderData() as CelebFashion;
  const service = id.split("_")[0];
  console.log(`service:: ${service}`);
  const firstSpaceIndex = id.indexOf(" ");
  const collectionName = id.slice(0, firstSpaceIndex);

  const [selectedCategory, setSelectedCategory] = useState<string>("tops");

  //event handlers
  const handleCategoryButtonClick = (category: string) => {
    console.log("start handleCategoryButtonClick func");

    console.log(`CreateDesign click button ${category}`);
    setSelectedCategory(category);
  };

  return (
    <>
      <ContainerMUI>
        <div style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          <Link to="/avivohayon/fashionai/profile">Back to Profile</Link>
          <br />
        </div>
        <Grid container spacing={2}></Grid>

        <>
          <ContainerBS style={{ maxWidth: "150svh" }}>
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
          </ContainerBS>
          {console.log(
            `inside the data&& !loading data is: ${fashionData.celebrity_name}`
          )}

          <FashionCards
            service_name={service}
            celebFashion={fashionData}
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
