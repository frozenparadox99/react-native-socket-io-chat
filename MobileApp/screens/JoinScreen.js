import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

const JoinScreen = ({ joinChat }) => {
  const [username, setUsername] = React.useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require("../assets/chat-icon.png")}
      />
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={{ fontSize: 30 }}
          placeholder="Enter Username"
        />
        <Button title="Join Chat" onPress={() => joinChat(username)} />
      </View>

      {Platform.OS === "ios" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default JoinScreen;
