import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import JoinScreen from "./JoinScreen";

import io from "socket.io-client";

export default function HomeScreen() {
  const [recvMessages, setRecvMessages] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);

  useEffect(function () {
    socket.current = io("http://192.168.1.20:3001");
    //    socket.emit("message","Hello World")
    socket.current.on("message", (message) => {
      setRecvMessages((prevState) => GiftedChat.append(prevState, message));
    });
  }, []);

  const onSend = (messages) => {
    console.log(messages);
    socket.current.emit("message", messages[0].text);
    setRecvMessages((prevState) => GiftedChat.append(prevState, messages));
    // setMessageToSend("");
  };

  const joinChat = (username) => {
    socket.current.emit("join", username);
    setHasJoined(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={recvMessages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />

      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
