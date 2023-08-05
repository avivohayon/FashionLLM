import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Item } from "../../types/models";
import { useClothesCart } from "../../Context/ClothesContext";

type StoreProps = {
  service_name: string;
  item: Item;
};

export const Store = ({ service_name, item }: StoreProps) => {
  // const { openCart, closeCart, nameFilter, setNameFilter } = useClothesCart();
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  // console.log(`cur asos imgUrl is: ${item.imageUrl}`);
  // console.log(`Store service name is: ${openCart}`);

  // console.log(`Store service name is: ${service_name}`);

  return (
    <Card
      className="h-100"
      style={{
        background: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "0",
      }}
    >
      <Card.Img
        variant="top"
        src={"https://" + item.imageUrl}
        style={{ width: "18.5rem", height: "20rem", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title
          style={{ justifyContent: "center" }}
          className="d-flex mb-4"
        >
          <span className="fs-4 text-muted">{item.name}</span>
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
              <Button onClick={() => console.log("b1")}>-</Button>
              <div>
                <span className="fs-3"> {2} </span> saved
              </div>
              <Button onClick={() => console.log("b2")}>+</Button>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => console.log("b3")}
            >
              {" "}
              remove{" "}
            </Button>
          </div>
          {/* } */}
        </div>
      </Card.Body>
    </Card>
  );
};
