import { useCallback, useState } from "react";
import axios from "axios";

export const usekroger = () => {
  const [search, setSearch] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(10);
  const [products, setProducts] = useState<any>();
  const [toShow, setToShow] = useState<number>(1);
  const [isCartOpened, setCartOpened] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState([]);

  const handleSearch = async () => {
    setToShow(2);
    await axios
      .get(
        `https://kroger-backend.vercel.app/makeApiRequest?filter.term=${search}&filter.limit=${quantity}`
      )
      .then((data) => {
        setProducts(data.data.data);
      })
      .then(() => setToShow(3));
  };
  const closeCart = useCallback(() => {
    setCartOpened(false);
  }, [isCartOpened]);

  return {
    search,
    setSearch,
    quantity,
    setQuantity,
    products,
    setProducts,
    toShow,
    setToShow,
    isCartOpened,
    setCartOpened,
    cartItems,
    setCartItems,
    handleSearch,
    closeCart,
  };
};
