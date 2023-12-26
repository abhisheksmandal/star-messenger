import { ChatIcon } from "@chakra-ui/icons";
import {
  Button,
  Circle,
  Divider,
  HStack,
  Heading,
  Tab,
  Text,
  TabList,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FriendContext } from "./Home";

const SideBar = () => {
  const { friendList, setFriendList } = useContext(FriendContext);
  return (
    <VStack py="1.4rem">
      <HStack justify="space-evenly" w="100%">
        <Heading size="md">Add Friend</Heading>
        <Button>
          <ChatIcon />
        </Button>
      </HStack>
      <Divider />
      <VStack as={TabList}>
        {/* <HStack as={Tab}>
          <Circle bg="red.500" w="10px" h="10px" />
          <Text>Abhishek</Text>
        </HStack>
        <HStack as={Tab}>
          <Circle bg="green.500" w="10px" h="10px" />
          <Text>Twyla</Text>
        </HStack> */}
        {friendList.map((friend) => (
          <HStack as={Tab}>
            <Circle
              bg={friend.connected ? "green.500" : "red.500"}
              w="10px"
              h="10px"
            />
            <Text>{friend.username}</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default SideBar;
