import React, { useState, useEffect } from "react";
import { Item, CelebFashion } from "../../types/models";
import { Container as ContainerBS, Row, Col, Button } from "react-bootstrap";
import { Store } from "../../Modules/components/Store";
import style from "./fashioncards.module.css";
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
  const [category, setCategory] = useState<string>("tops");

  const [itemData, setItemData] = useState<Item[]>(celebFashion.tops);
  const [chunkIndex, setChunkIndex] = useState<number>(0);
  const chunkSize = 12;

  useEffect(() => {
    if (celebFashion && celebFashion[category]) {
      console.log("use effect of FashionCards");
      setCategory(selectedCategory);
      console.log("Selected Category:", selectedCategory); // Add this line
      const categoryData: Item[] = Array.isArray(celebFashion[selectedCategory])
        ? (celebFashion[selectedCategory] as Item[])
        : [];
      setItemData(categoryData);
      setChunkIndex(0);
    }
  }, [selectedCategory]);

  const renderChunk = () => {
    const start = chunkIndex * chunkSize;
    const end = start + chunkSize;
    return itemData.slice(start, end);
  };

  const loadMore = () => {
    setChunkIndex(chunkIndex + 1);
  };

  const goBack = () => {
    if (chunkIndex > 0) {
      setChunkIndex(chunkIndex - 1);
    }
  };
  return (
    <div className={style["fashion-cards-container"]}>
      <ContainerBS style={{ display: "flex" }}>
        <img
          className={style["fashion-cards-image"]}
          src={celebFashion.imageUrl}
        ></img>
        <span className={style["fashion-cards-text"]}>
          {celebFashion.conclusion}
        </span>
        <div>
          {/* {Object.entries(celebFashion.aiResult).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))} */}
        </div>
      </ContainerBS>
      <ContainerBS
        style={{
          // background: "linear-gradient(90deg, #755ce2 9.64%, #58d8fc 58.53%)",

          maxWidth: "100%",
          paddingBottom: "5rem",
        }}
      >
        <Row md={3} xs={2} lg={4} className="g-3">
          {renderChunk().map((item) => (
            <Col key={item.url}>
              <Store service_name={service_name} item={item} />
            </Col>
          ))}
        </Row>
      </ContainerBS>
      <ContainerBS>
        <div
          className={style["button-container"]}
          style={{ marginBottom: "2rem" }}
        >
          {chunkIndex > 0 && (
            <button className={style["prev-button"]} onClick={goBack}>
              Prev
            </button>
          )}
          {chunkIndex * chunkSize < itemData.length - chunkSize && (
            <button className={style["load-more-button"]} onClick={loadMore}>
              Load More
            </button>
          )}
        </div>
      </ContainerBS>
    </div>
  );
};

export default FashionCards;
