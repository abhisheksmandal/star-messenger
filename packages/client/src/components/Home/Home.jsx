import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import SideBar from "./SideBar";
import Chat from "./Chat";
import { createContext, useState } from "react";

export const FriendContext = createContext();

const Home = () => {
  const [friendList, setFriendList] = useState([
    { username: "Twyla", connected: true },
    { username: "Abhishek", connected: false },
  ]);
  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}>
        <GridItem colSpan="3" borderRight="1px solid gray">
          <SideBar />
        </GridItem>
        <GridItem colSpan="7">
          <Chat />
        </GridItem>
      </Grid>
    </FriendContext.Provider>
  );
};

export default Home;
