import { Button, Drawer, Flex, Image, Paper, Text, Title } from "@mantine/core";
import { Fragment, useState } from "react";

export const Cart = ({
  isCartOpened,
  closeCart,
  cartItems,
  setCartItems,
}: any) => {
  const [loading, setLoading] = useState(false);
  const handleIncrement = (productId: string) => {
    setLoading(true);
    setCartItems((prev: any) =>
      prev.map((item: any) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    setLoading(false);
  };

  const handleDecrement = (productId: string) => {
    setLoading(true);
    setCartItems((prev: any) =>
      prev.map((item: any) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    setLoading(false);
  };

  const handleRemoveItem = (productId: string) => {
    setLoading(true);
    setCartItems((prev: any) =>
      prev.filter((item: any) => item.productId !== productId)
    );
    setLoading(false);
  };
  console.log("cartitems ", cartItems.length);

  return (
    <Fragment>
      <Drawer opened={isCartOpened} onClose={closeCart}>
        <Drawer.Title>
          <Title>Cart</Title>
        </Drawer.Title>
        <Drawer.Body>
          {cartItems.length == 0 && (
            <Flex justify="center" align="center" h="100vh" fz="xl">
              <Text>No Items in Cart</Text>
            </Flex>
          )}
          <Paper>
            {cartItems?.map((item: any) => (
              <Flex
                key={item?.productId}
                sx={{
                  border: "1px solid gray",
                  borderRadius: "20px",
                }}
                p="lg"
                mt="md"
              >
                <div>
                  <Flex direction="column">
                    <p>{item.description}</p>
                    <Flex>
                      <div>
                        <p>Id: {item?.productId}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div>
                        <Image
                          src={item?.images[0].sizes[0].url}
                          p="xl"
                        ></Image>
                      </div>
                    </Flex>
                  </Flex>
                  <Flex w="19rem" justify="space-between">
                    <Flex gap="lg">
                      <Button
                        disabled={loading}
                        onClick={() => handleIncrement(item.productId)}
                      >
                        +
                      </Button>
                      <Button
                        disabled={loading}
                        onClick={() => handleDecrement(item.productId)}
                      >
                        -
                      </Button>
                    </Flex>
                    <Button
                      disabled={loading}
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      Remove Item
                    </Button>
                  </Flex>
                </div>
              </Flex>
            ))}
          </Paper>
        </Drawer.Body>
      </Drawer>
    </Fragment>
  );
};
