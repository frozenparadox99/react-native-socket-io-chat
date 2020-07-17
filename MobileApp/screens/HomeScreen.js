import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import io from "socket.io-client";

export default function HomeScreen() {
  const [messageToSend, setMessageToSend] = useState("");
  const [recvMessages, setRecvMessages] = useState([]);
  const socket = useRef(null);

  useEffect(function () {
    socket.current = io("http://192.168.1.20:3001");
    //    socket.emit("message","Hello World")
    socket.current.on("message", (message) => {
      setRecvMessages((prevState) => [...prevState, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.current.emit("message", messageToSend);
    setMessageToSend("");
  };

  const textOfRecvMessages = recvMessages.map((msg) => {
    return <Text key={msg}>{msg}</Text>;
  });

  return (
    <View style={styles.container}>
      {textOfRecvMessages}
      <TextInput
        value={messageToSend}
        onChangeText={(text) => setMessageToSend(text)}
        placeholder="Enter chat message..."
        onSubmitEditing={sendMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
