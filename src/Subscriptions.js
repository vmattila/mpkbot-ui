import React, { useState } from "react";
import {
  Collection,
  Card,
  Flex,
  Button,
  Heading,
  Text,
  Loader,
} from "@aws-amplify/ui-react";
import SearchTokens from "./SearchTokens";

const Subscriptions = (props) => {
  const [isLoading] = useState(!!props.isLoading);
  return (
    <>
      {!!isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading level={2}>Aktiiviset hakuvahtisi</Heading>

          <Collection
            items={props.subscriptions}
            type="list"
            direction="row"
            gap="20px"
            wrap="nowrap"
            searchNoResultsFound={
              <Flex justifyContent="center">
                <Text color="grey.80" fontSize="1rem">
                  Sinulla ei ole vielä hakuvahteja. Lisää hakuvahti alta.
                </Text>
              </Flex>
            }
          >
            {(item, index) => (
              <Card key={index} borderRadius="medium" backgroundColor="blue.10">
                <Flex direction="column">
                  <SearchTokens tokens={item.tokens} />

                  <Flex direction="row">
                    <Button
                      onClick={() => props.onShowCourses(item.id, item.tokens)}
                    >
                      Näytä kurssit
                    </Button>
                    <Button onClick={() => props.onDropSubscription(item.id)}>
                      Poista
                    </Button>
                  </Flex>

                  <Text fontSize="xxs">{item.id}</Text>
                </Flex>
              </Card>
            )}
          </Collection>
        </>
      )}
    </>
  );
};
export default Subscriptions;
