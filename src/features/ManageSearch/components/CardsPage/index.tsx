import { Fragment } from "react";
import { CardItem } from "../CardItem";
import { Flex } from "@mantine/core";

export const CardsPage = ({ products, toShow }: any) => {
  return (
    <Fragment>
      {toShow == 3 ? (
        <Flex wrap="wrap" gap="lg" justify="space-around" mt="lg">
          {products?.map((product: any) => (
            <CardItem product={product} />
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
