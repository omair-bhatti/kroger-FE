import React, { Fragment } from "react";
import { Button, NumberInput, Paper, TextInput } from "@mantine/core";
import { CardsPage } from "../CardsPage";
import { Cart } from "../Cart";
import { usekroger } from "../../hooks";

export const SearchPage = () => {
  const {
    products,
    toShow,
    cartItems,
    closeCart,
    isCartOpened,
    setCartItems,
    setSearch,
    setQuantity,
    handleSearch,
    setCartOpened,
  } = usekroger();

  return (
    <Fragment>
      <Cart
        isCartOpened={isCartOpened}
        closeCart={closeCart}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <Paper style={{ padding: "10px" }}>
        <Paper
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            label="Product"
            placeholder="Search Product"
            withAsterisk
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.currentTarget.value)
            }
          ></TextInput>
          <NumberInput
            label="Total Results"
            defaultValue={10}
            placeholder="Total Results"
            onChange={(e: number) => setQuantity(e)}
          />
          <Button mt="lg" onClick={handleSearch}>
            Search
          </Button>
          <Button mt="lg" onClick={() => setCartOpened(true)}>
            Go to Cart
          </Button>
        </Paper>
        <CardsPage
          products={products}
          toShow={toShow}
          setCartOpened={setCartOpened}
          setCartItems={setCartItems}
          cartItems={cartItems}
        />
      </Paper>
    </Fragment>
  );
};
