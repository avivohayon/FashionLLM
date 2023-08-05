import React, { useState, useEffect } from "react";
import { Item, CelebFashion } from "../../types/models";
import { Container as ContainerBS, Row, Col, Button } from "react-bootstrap";
import { Store } from "../../Modules/components/Store";
// its the "Bible text from my prev web"
type CelebFashionProps = {
  service_name: string;
  celebFashion: CelebFashion;
  selectedCategory: string;
};

const FashionCards = ({
  service_name,
  celebFashion,
  selectedCategory,
}: CelebFashionProps) => {
  //   const [category, setCategory] = useState<string>("hat");
  const [categoryData, setCategoryData] = useState<Item[] | string>(
    celebFashion.tops
  );

  useEffect(() => {
    if (celebFashion && celebFashion[selectedCategory]) {
      console.log("use effect of FashionCards");
      setCategoryData(celebFashion[selectedCategory]);
      console.log("Selected Category:", selectedCategory); // Add this line
    }
  }, [selectedCategory]);

  return (
    <>
      <ContainerBS
        style={{
          background: "linear-gradient(90deg, #755ce2 9.64%, #58d8fc 58.53%)",
          maxWidth: "100%",
          paddingBottom: "5rem",
        }}
      >
        <Row md={2} xs={1} lg={3} className="g-3">
          {Array.isArray(categoryData) &&
            categoryData.map((item) => (
              <Col key={item.url}>
                <Store service_name={service_name} item={item} />
              </Col>
            ))}
        </Row>
      </ContainerBS>
    </>
  );
};

export default FashionCards;
