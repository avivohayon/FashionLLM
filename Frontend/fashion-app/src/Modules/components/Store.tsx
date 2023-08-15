import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Item } from "../../types/models";
import { useClothesCart } from "../../Context/ClothesContext";
import style from "../views/fashioncards.module.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
type StoreProps = {
  service_name: string;
  item: Item;
};

export const Store = ({ service_name, item }: StoreProps) => {
  // const { openCart, closeCart, nameFilter, setNameFilter } = useClothesCart();
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      className={`${style.card} ${style["card-hover"]} `}
      // style={{
      //   // background: "transparent",
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   // border: "0",
      //   border: "10px solid #b5bdb7",
      //   borderRadius: "2rem 10rem",
      // }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card.Img
        variant="top"
        src={"https://" + item.imageUrl}
        style={{
          width: isHovered ? "23rem" : "18.5rem",
          height: isHovered ? "25rem" : "20rem",
          objectFit: "cover",
          cursor: "pointer",
          filter: isHovered ? "blur(5px)" : "none",
        }}
      />
      {isHovered && (
        <div
          style={{
            display: "flex",
            position: "absolute",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            // opacity: 0,
            transition: "opacity 0.3s",
            backgroundColor: "#1f3d4738", // Semi-transparent black overlay
          }}
        >
          <h5
            style={{
              display: "flex",
              position: "relative",
              alignContent: "center",
              gap: "9px 2px 9px 9px",
              marginRight: "2rem",
              marginLeft: "2rem",

              color: "white",
              flexShrink: "shrink",
            }}
          >
            {item.name}
          </h5>
          <p className={`${style["hover-price"]}`}>
            {item?.price !== undefined && item?.price !== null
              ? item.price["text"]
              : "Go to official website for more info"}
          </p>
          <div>
            <button
              className={`${style["hover-button"]} ${style["like-button"]}`}
              onClick={() => setLiked(!liked)}
              style={{ backgroundColor: "transparent" }}
            >
              {liked ? "❤️ Liked" : "♡ Like"}
            </button>
            <a
              href={"https://" + `${service_name}` + ".com/" + item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${style["hover-button"]}`}
            >
              Website
            </a>
          </div>
        </div>
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title
          style={{ justifyContent: "center" }}
          className="d-flex mb-2"
        >
          {/* <span className="fs-4 text-muted">{item.name}</span> */}
        </Card.Title>
        <div className="mt-auto">
          {/* {quantity === 0 ? (
            // <Button className="w-100" onClick={() => increaseCartQuantity(id)}>add image</Button>
          ) :  */}
          <div
            className="d-flex align-items-center flex-column"
            style={{ gap: ".5rem" }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              {/* <Button onClick={() => console.log("b1")}>-</Button> */}
              <div>
                <span className="fs-3"> {} </span>
              </div>
              {/* <Button onClick={() => console.log("b2")}>+</Button> */}
            </div>

            {liked ? "❤️ Liked" : ""}

            {/* <Button
              variant="danger"
              size="sm"
              onClick={() => console.log("b3")}
            >
              {" "}
              add heart button from font awsome{" "}
            </Button> */}
          </div>
          {/* } */}
        </div>
      </Card.Body>
    </Card>
  );
};
