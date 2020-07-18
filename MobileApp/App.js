import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import AppContainer from "./AppContainer";

import { Provider } from "react-redux";

const socket = io("http://192.168.1.20:3001");

const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

function reducer(state = { conversations: {} }, action) {
  switch (action.type) {
    case "message":
      return { ...state, message: action.data };
    case "users_online":
      const conversations = { ...state.conversations };
      const usersOnline = action.data;
      for (let i = 0; i < usersOnline.length; i++) {
        const userId = usersOnline[i].userId;
        if (conversations[userId] === undefined) {
          conversations[userId] = {
            messages: [],
            username: usersOnline[i].username,
          };
        }
      }
      return { ...state, usersOnline, conversations };
    case "self_user":
      return { ...state, selfUser: action.data };
    case "private_message":
      const conversationId = action.data.conversationId;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [
              action.data.message,
              ...state.conversations[conversationId].messages,
            ],
          },
        },
      };
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log("new state", store.getState());
});

store.dispatch({ type: "server/hello", data: "Hello!" });

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
