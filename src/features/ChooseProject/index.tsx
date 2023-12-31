import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Title } from "@mantine/core";

export const ChooseProject = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Title align="center" mt="20px">
        Select Project
      </Title>
      <Flex justify="space-around" align="center" h="80vh">
        <Flex
          w="30%"
          h="30%"
          justify="center"
          align="center"
          sx={{
            border: "4px solid black",
            borderRadius: "30px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/kroger")}
        >
          <Title align="center">Kroger</Title>
        </Flex>
        <Flex
          w="30%"
          h="30%"
          justify="center"
          align="center"
          sx={{
            border: "4px solid black",
            borderRadius: "30px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/geohash")}
        >
          <Title align="center">Geohash</Title>
        </Flex>
      </Flex>
    </Fragment>
  );
};
