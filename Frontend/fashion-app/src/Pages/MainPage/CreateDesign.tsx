import React, { useState } from "react";
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

const CreateDesign = () => {
  console.log("start CreateDesign");
  const [inputValue, setInputValue] = useState("");
  const { data, loading, error, getCelebFashion } = useFetchCelebFashion();
  const [selectedCategory, setSelectedCategory] = useState<string>("hat");

  const handleCategoryButtonClick = (category: string) => {
    console.log(`CreateDesign click button ${category}`);
    setSelectedCategory(category);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleButtonClick = () => {
    console.log("start  handleButtonClick");
    console.log(`before input val : ${inputValue}`);
    getCelebFashion("asos", inputValue);
    console.log(`after input val : ${inputValue}`);
  };

  // const handleSubmit =() => {
  //   console.log(inputValue)
  //   // just for now i will do it btter for other services soon
  //   const url = `http://localhost:8123/avivohayon/fashionai/data/asos?celebrity_name=${inputValue}`;
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Received response:', data);
  //       // Handle the response data as needed
  //     })
  //     .catch(error => {
  //       console.error('Request error:', error);
  //       // Handle the request error
  //     });
  // }

  return (
    <>
      <ContainerMUI>
        asdasdaasd
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Enter your input"
              value={inputValue}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleButtonClick} fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
        <ContainerBS style={{ maxWidth: "150svh" }}>
          <div className="mb-3">
            <Button onClick={() => handleCategoryButtonClick("hat")}>
              Hats
            </Button>
            <Button onClick={() => handleCategoryButtonClick("glasses")}>
              Glasses
            </Button>
            <Button onClick={() => handleCategoryButtonClick("jewelry")}>
              Jewelry
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
          </div>
        </ContainerBS>
      </ContainerMUI>
      {data && (
        <FashionCards
          service_name="asos"
          celebFashion={data}
          selectedCategory={selectedCategory}
        />
      )}
      {/* <Category /> */}
    </>
  );
};

export default CreateDesign;
