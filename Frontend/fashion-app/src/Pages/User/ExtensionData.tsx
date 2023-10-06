import axios from "../../Hooks/axios";
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

type test = {
  response: string;
  name: string;
};

export function ExtensionFashionData() {
  // this component renders the searched target clothes fashion
  const { id } = useParams() as any;
  const fashionData = useLoaderData() as CelebFashion;
  const filteredFashionData: CelebFashion = removeDuplicatedItems(fashionData);
  // const service = id.split("_")[0];
  // console.log(`service:: ${service}`);
  const firstSpaceIndex = id.indexOf(" ");
  console.log(fashionData);
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
            service_name={"asos"}
            celebFashion={filteredFashionData}
            selectedCategory={selectedCategory}
          />
        </>
      </ContainerMUI>
    </>
  );
}

//loader function
export const ExtensionLoader = async ({ params }: any) => {
  const { id } = params;
  console.log("jibibjai");
  console.log(id);
  // Make an API request using the `id` parameter
  try {
    const response = await axios.get(
      `http://localhost:8123/avivohayon/fashionai/test/${id}`
    );
    const data = response.data;
    console.log(data.response);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
