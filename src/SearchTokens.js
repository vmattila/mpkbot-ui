import React from "react";
import { Collection, Badge, Flex, Text } from "@aws-amplify/ui-react";

const SearchTokens = (props) => {
  return (
    <Collection
      items={props.tokens}
      type="list"
      direction="row"
      searchNoResultsFound={
        <Flex justifyContent="center">
          <Text color="grey.80" fontSize="0.5rem">
            Kirjoita hakuehto
          </Text>
        </Flex>
      }
    >
      {(item, index) => (
        <Badge
          key={index}
          backgroundColor={item[0] === "-" ? "red.40" : "green.40"}
        >
          {item}
        </Badge>
      )}
    </Collection>
  );
};
export default SearchTokens;
