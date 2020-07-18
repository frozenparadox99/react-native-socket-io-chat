import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

const FriendListScreen = () => {
  const usersOnline = useSelector((state) => state.usersOnline);
  console.log("usersOnline", usersOnline);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={usersOnline}
        renderItem={({ item }) => {
          console.log("item", item);
          return <Text style={{ flex: 1 }}>{item.username}</Text>;
        }}
        keyExtractor={(item) => item.username}
      />
    </View>
  );
};

export default FriendListScreen;
