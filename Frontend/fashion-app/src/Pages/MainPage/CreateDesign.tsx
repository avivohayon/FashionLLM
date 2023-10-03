import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
import { Select } from "../../Modules/components/Select";
import { Link } from "react-router-dom";
import useRefreshToken from "../../Hooks/useRefreshToken";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Footer from "../../Modules/views/Footer";

// the main page component responsible for calling to the backend server and populate the result
const CreateDesign = () => {
  const options = [
    { label: "asos", value: 1 },
    { label: "shein", value: 2 },
  ];
  // Main hooks
  const inputValueRef = useRef<string>("");
  const [celebInputValue, setCelebInputValue] = useState("");
  const [service, setService] = useState<string>("asos");

  const [serviceOptionValue, setServiceOptionValue] = useState<
    (typeof options)[0] | undefined
  >(options[0]);

  const [selectedCategory, setSelectedCategory] = useState<string>("tops");

  const [loadPage, setLoadPage] = useState<boolean>();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, loading, error } = useFetchCelebFashion(
    service,
    celebInputValue
  );
  console.log(`start CreateDesign with data: ${data?.celebrity_name}}`);

  // this useEffect will run 1 time to check if the user have login to the website in order to use the main celeb fashion llm functionality
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // use for cancel the request if the component un mounts
    const getCelebLLM = async () => {
      try {
        const response = await axiosPrivate.get("/auth/protected/celebLlm", {
          // signal: controller.signal,
        });
        // isMounted && setLoadPage(response.data.allowed);
      } catch (err) {
        navigate("/avivohayon/fashionai/login/", {
          state: { from: location },
          replace: true,
        });
      }
    };

    getCelebLLM();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // init config
  if (loading) {
    return <h1> LOADING.....</h1>;
  }

  if (error) {
    console.log(`found error in the if statment of CreateDesign ${error}`);
  }

  //event handlers
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
    setService(serviceOptionValue?.label as string);
  };

  return (
    <>
      <ContainerMUI>
        <div style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          <Link to="/">Home</Link>
          <br />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Enter your input"
              inputRef={inputValueRef}
              autoComplete="off"
              // value={inputValueRef.current}
              onChange={(e) => handleInputChange(e)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Select
              options={options}
              value={serviceOptionValue}
              onChange={(option) => setServiceOptionValue(option)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              onClick={(event) => handleButtonClick(event)}
              fullWidth
            >
              Submit
            </Button>
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

                <Button onClick={() => handleCategoryButtonClick("jewelry")}>
                  unique-accessories
                </Button>
              </div>
            </ContainerBS>
            {console.log(
              `inside the data&& !loading data is: ${data.celebrity_name}`
            )}

            <FashionCards
              service_name={service}
              celebFashion={data}
              selectedCategory={selectedCategory}
            />
          </>
        )}
      </ContainerMUI>
    </>
  );
};

export default CreateDesign;
