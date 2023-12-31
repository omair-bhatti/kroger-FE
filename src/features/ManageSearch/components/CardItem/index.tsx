import { Card, Image, Text, Group, Flex, Button } from "@mantine/core";
import classes from "./CardWithStats.module.css";

export const CardItem = ({ product, handleAddToCart }: any) => {
  const items = (
    <Flex justify="space-around" gap="lg" align="start">
      <Text size="xs">{product?.brand}</Text>
      <Text size="xs">{product?.categories[0]}</Text>
    </Flex>
  );

  return (
    <Card withBorder padding="lg" className={classes.card} w="250px">
      <Card.Section>
        <Image
          fit="contain"
          src={product?.images[0].sizes[0].url}
          alt="Running challenge"
          height={100}
        />
      </Card.Section>

      <Group mt="xl">
        <Text fz="sm" fw={700} className={classes.title}>
          {product?.description}
        </Text>
        <Group>
          <Text fz="xs">
            Size{" "}
            <span
              style={{ fontSize: "16px" }}
            >{`(${product.items[0].size})`}</span>
          </Text>
        </Group>
      </Group>
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        description description description description description description
        description description
      </Text>
      <Card.Section>{items}</Card.Section>
      <Card.Section>
        <Flex justify="center" align="center" m="10px">
          <Button compact onClick={() => handleAddToCart(product)}>
            Add to Cart
          </Button>
        </Flex>
      </Card.Section>
    </Card>
  );
};
