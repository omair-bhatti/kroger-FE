import { Fragment } from "react";
import { CardItem } from "../CardItem";
import { Flex } from "@mantine/core";

export const CardsPage = ({
  products,
  toShow,
  setCartOpened,
  setCartItems,
  cartItems,
}: any) => {
  const handleAddToCart = (product: any) => {
    setCartOpened(true);
    const existingProductIndex = cartItems.findIndex(
      (item: any) => item.productId === product.productId
    );
    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update its quantity
      setCartItems((prev: any) =>
        prev.map((item: any, index: any) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : { ...item, quantity: 1 }
        )
      );
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCartItems((prev: any) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  return (
    <Fragment>
      {toShow == 3 ? (
        <Flex wrap="wrap" gap="lg" justify="space-around" mt="lg">
          {products?.map((product: any) => (
            <CardItem
              product={product}
              handleAddToCart={() => handleAddToCart(product)}
              key={product?.productId}
            />
          ))}
        </Flex>
      ) : toShow == 2 ? (
        <Flex justify="center" align="center" h="100vh" fz="xl">
          Loading ...{" "}
        </Flex>
      ) : (
        <Flex justify="center" align="center" h="100vh" fz="xl">
          Search Something
        </Flex>
      )}
    </Fragment>
  );
};
