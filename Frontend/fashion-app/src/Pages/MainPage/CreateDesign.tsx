import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Container as ContainerBS } from "react-bootstrap";
import {
  Container as ContainerMUI,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import useFetchCelebFashion from "../../Hooks/useFetchCelebFashion";
import { Category } from "../../Modules/components";
import FashionCards from "../../Modules/views/FashionCards";
import { CelebFashion } from "../../types/models";

const CreateDesign = () => {
  console.log("start CreateDesign");

  const inputValueRef = useRef<string>("");
  const [celebInputValue, setCelebInputValue] = useState("");
  const [service, setService] = useState<string>("asos");

  const { data, loading, error } = useFetchCelebFashion(
    service,
    celebInputValue
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("tops");
  console.log(`start CreateDesign with data: ${data?.celebrity_name}}`);

  if (loading) {
    return <h1> LOADING.....</h1>;
  }
  if (error) {
    console.log(`found error in the if statment of CreateDesign ${error}`);
  }

  const handleCategoryButtonClick = (category: string) => {
    console.log("start handleCategoryButtonClick func");

    console.log(`CreateDesign click button ${category}`);
    setSelectedCategory(category);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("start handleinput change");

    e.preventDefault();

    // setInputValue(event.target.value);
    inputValueRef.current = e.target.value;
    console.log(inputValueRef.current);
    console.log("----------");
  };

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("start handleButtonClick func");
    console.log("start  handleButtonClick");
    event.preventDefault();

    console.log(
      `handleButtonClick before setInputValue ${inputValueRef.current}`
    );

    setCelebInputValue(inputValueRef.current);
    setSelectedCategory("tops");
  };

  return (
    <>
      <ContainerMUI>
        asdasdaasd
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Enter your input"
              inputRef={inputValueRef}
              // value={inputValueRef.current}
              onChange={(e) => handleInputChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              onClick={(event) => handleButtonClick(event)}
              fullWidth
            >
              Submit
            </Button>
            {/* <Button
              variant="contained"
              onClick={handleShowButtonClick}
              fullWidth
            >
              Show
            </Button> */}
          </Grid>
        </Grid>
        {data?.celebrity_name && !loading && (
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
                {/* <Button
              onClick={() => handleCategoryButtonClick("unique_accessories")}
            >
              unique-accessories
            </Button> */}
                <Button onClick={() => handleCategoryButtonClick("jewelry")}>
                  unique-accessories
                </Button>
              </div>
            </ContainerBS>
            {console.log(
              `inside the data&& !loading data is: ${data.celebrity_name}`
            )}
            <FashionCards
              service_name="asos"
              celebFashion={data}
              selectedCategory={selectedCategory}
            />
          </>
        )}
      </ContainerMUI>
      {/* Render FashionCards component based on selectedCategory */}
      {/* {data && (
        <FashionCards
          service_name="asos"
          celebFashion={data}
          selectedCategory={selectedCategory}
        />
      )} */}
      {/* {showData && data && (
        <FashionCards
          service_name="asos"
          celebFashion={data}
          selectedCategory={selectedCategory}
        />
      )} */}
      {/* {newData && (
        <FashionCards
          service_name="asos"
          celebFashion={newData}
          selectedCategory={selectedCategory}
        />
      )} */}
      {/* <Category /> */}
    </>
  );
};

export default CreateDesign;
