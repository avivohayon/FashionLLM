import React, { ReactNode, createContext, useContext, useState } from "react";
import { Item } from "../types/models";
type ClothesCartProviderProps = {
  children: ReactNode;
};

type ClothesCartContextType = {
  // getItemQuantity: (id: number) => number;

  // removeFromCart: (id: number) => void;
  // getCartItems: () => Item[];

  openCart: () => void;
  closeCart: () => void;

  nameFilter: string;
  setNameFilter: (name: string) => void;

  quantityFilter: number;
  setQuantityFilter: (quantity: number) => void;
};
const ClothesCartContext = createContext<ClothesCartContextType>(
  {} as ClothesCartContextType
);
//custom context hook
export function useClothesCart() {
  return useContext(ClothesCartContext);
}

// provider  for warping the context hook
export function ClothesCartProvider({ children }: ClothesCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItem] = useState<Item[]>([]);
  // const [cartItems, setCartItems] = useLocalStorage<Item[]>("image-cart", []);
  // const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);
  // const dispatch = useDispatch();

  const [nameFilter, setNameFilter] = useState("");
  const [quantityFilter, setQuantityFilter] = useState(0);

  // const tampelateHandler = (id: number) => {
  //   console.log('clicked image id is: ', id)
  //   dispatch(saveTampelateConfig(id));
  //   setTamelateId(prevID => prevID === id ? null : id);
  // };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  // function getItemQuantity(id: number) {
  //   return cartItems.find(item => item.id === id)?.quantity || 0;
  // }

  // function increaseCartQuantity(id: number) {
  //   setCartItems(curItems => {
  //     const itemExists = curItems.find(item => item.id === id);
  //     if (!itemExists) {
  //       return [...curItems, { id, quantity: 1 }];
  //     } else {
  //       return curItems.map(item =>
  //         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //       );
  //     }
  //   });
  // }

  // function decreaseCartQuantity(id: number) {
  //   setCartItems(curItems => {
  //     if (cartItems.find(item => item.id === id)?.quantity === 1) {
  //       return curItems.filter(item => item.id !== id);
  //     } else {
  //       return curItems.map(item => {
  //         if (item.id === id) {
  //           return { ...item, quantity: item.quantity - 1 };
  //         } else {
  //           return item;
  //         }
  //       });
  //     }
  //   });
  // }

  // const getImageUrlById = (name: string) => {
  //   const item = storedItems.find(item => item.id === name);
  //   return item ? item.imgUrl : null;
  // };

  // function removeFromCart(name: string) {
  //   const deleteUrl = getImageUrlById(name);
  //   setCartItems(curItems => {
  //     return curItems.filter(item => item.name !== name);
  //   });
  // }

  // function getCartItems() {
  //   return cartItems;
  // }

  return (
    <ClothesCartContext.Provider
      value={{
        // getItemQuantity,

        // removeFromCart,
        // getCartItems,
        openCart,
        closeCart,

        nameFilter,
        setNameFilter,

        quantityFilter,
        setQuantityFilter,
      }}
    >
      {children}
      {/* <ImageCart isOpen={isOpen} /> */}
    </ClothesCartContext.Provider>
  );
}
