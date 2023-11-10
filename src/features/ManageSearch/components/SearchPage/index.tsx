import React, { Fragment, useState } from "react";
import { Button, NumberInput, Paper, TextInput } from "@mantine/core";
import { CardsPage } from "../CardsPage";
import axios from "axios";

export const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(10);
  const [products, setProducts] = useState<any>();
  const [toShow, setToShow] = useState<number>(1);
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
  return (
    <Fragment>
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
        </Paper>
        <CardsPage products={products} toShow={toShow} />
      </Paper>
    </Fragment>
  );
};
