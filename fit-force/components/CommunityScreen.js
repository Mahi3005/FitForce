import { View, Text } from "react-native";
import React from "react";
import { io } from "socket.io-client";

const CommunityScreen = () => {
  console.log("object");
  const socket = io("https://fit-force-ai-assistant-backend.onrender.com/");
  console.log(socket);

  socket.emit("chat message", "TRY MESSAGE");
  console.log(socket);
  return (
    <View>
      <Text>CommunityScreen</Text>
    </View>
  );
};

export default CommunityScreen;
