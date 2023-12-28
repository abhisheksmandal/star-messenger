import { useContext, useEffect } from "react";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";

const useSocketSetup = (setFriendList, setMessages) => {
  const { setUser } = useContext(AccountContext);

  useEffect(() => {
    console.log("Setting up socket");

    socket.connect();

    socket.on("friends", (friendList) => {
      console.log("Received friends:", friendList);
      setFriendList(friendList);
    });
    socket.on("messages", (messages) => {
      setMessages(messages);
    });

    socket.on("dm", (message) => {
      setMessages((prevMsgs) => [message, ...prevMsgs]);
    });

    socket.on("connected", (status, username) => {
      console.log(
        `Received connected event: status=${status}, username=${username}`
      );
      setFriendList((prevFriend) => {
        return prevFriend.map((friend) => {
          if (friend && friend.username === username) {
            return { ...friend, connected: status };
          }
          return friend;
        });
      });
    });

    socket.on("connect_error", () => {
      console.log("Socket connection error");
      setUser({ loggedIn: false });
    });

    return () => {
      console.log("Cleaning up socket setup");
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friends");
      socket.off("messages");
    };
  }, [setUser, setFriendList, setMessages]);
};

export default useSocketSetup;
