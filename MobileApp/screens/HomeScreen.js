import React from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

HomeScreen.navigationOptions = (screenProps) => ({
  title: screenProps.navigation.getParam("name"),
});

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={[]}
        user={{
          _id: 1,
        }}
      />

      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
