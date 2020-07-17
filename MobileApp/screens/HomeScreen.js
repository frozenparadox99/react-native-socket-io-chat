import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import io from "socket.io-client";

export default function HomeScreen() {
  const [messageToSend, setMessageToSend] = useState("");
  const socket = useRef(null);

  useEffect(function () {
    socket.current = io("http://192.168.1.20:3001");
    //    socket.emit("message","Hello World")
  }, []);

  const sendMessage = () => {
    socket.current.emit("message", messageToSend);
    setMessageToSend("");
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
