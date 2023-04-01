import React from 'react';
import {
  Collection,
  Card,
  View,
  Flex,
  Badge,
  Button,
  Heading,
  Text,
} from '@aws-amplify/ui-react';

const Subscriptions = (props) => {
  
  return (
    <>
    <h2>Aktiiviset hakuvahtisi</h2>

    <Collection
  items={props.subscriptions}
  type="list"
  direction="row"
  gap="20px"
  wrap="nowrap"
  searchNoResultsFound={
    <Flex justifyContent="center">
      <Text color="purple.80" fontSize="1rem">
        Sinulla ei ole vielä hakuvahteja. Lisää hakuvahti alta.
      </Text>
    </Flex>
  }
>
  {(item, index) => (
    <Card
      key={index}
      borderRadius="medium"
      variation="outlined"
      backgroundColor='blue.10'
    >
      <View padding="xs">
        <Flex>
        <Heading level={4}>{item.keywords}</Heading>
            {item.not_keywords && <Badge
                  backgroundColor="red.40"
                >
                  {item.not_keywords}
                </Badge>}
        </Flex>
        <Button onClick={() => props.onShowCourses(item.id, item.keywords, item.not_keywords)}>Näytä kurssit</Button>
        <Button onClick={() => props.onDropSubscription(item.id)}>Poista</Button>
      </View>
    </Card>
  )}
</Collection>
    </>
  );
};
export default Subscriptions;