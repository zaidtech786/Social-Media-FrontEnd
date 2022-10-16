import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Send from "react-native-vector-icons/FontAwesome";
import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "./Context/useContext";
import Conversation, { getMessages } from "./Conversation";
import { Route } from "@react-navigation/native";
import axios from "axios";
import { format } from "timeago.js";
import { io } from "socket.io-client";

const Message = ({ route }) => {
  const [msg, setMsg] = useState("");
  const { userId } = useContext(AuthContext);
  const [user, setUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const { conversationId, friendId } = route.params;
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:3000");

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // socket.current.emit("sendMessage", {
  //   senderId: userId,
  //   receiverId: friendId,
  //   text: msg,
  // });

  const getUser = async () => {
    try {
      const res = await axios(
        `http://192.168.0.106:5000/api/profile/${friendId}`
      );
      console.log("Response getting from USer", res);
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  const getMessages = async () => {
    console.log("conversationId", conversationId);
    try {
      const res = await axios.get(
        `http://192.168.0.106:5000/chat/getmessage/${conversationId}`
      );
      console.log("Response getting from Messsage", res.data);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    getMessages();
  }, []);

  const sendMsg = () => {
    if (msg == "") {
      Alert.alert("Enter Message");
    } else {
      axios
        .post("http://192.168.0.106:5000/chat/postmessage", {
          senderId: userId,
          conversationId,
          text: msg,
        })
        .then((res) => {
          <Conversation msg={msg} />;
          setMessages([...messages, res.data]);
          setMsg("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <View style={{ backgroundColor: "#f1c40f", paddingVertical: 20 }}>
        <Text
          style={{
            alignSelf: "center",
            marginTop: 30,
            fontSize: 20,
            backgroundColor: "#f1c40f",
          }}
        >
          {user.name}
        </Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(key) => key._id}
        renderItem={({ item }) => {
          return (
            <SafeAreaView>
              <View
                style={
                  userId == item.senderId ? styles.CurrentUser : styles.User
                }
              >
                <View style={styles.message}>
                  <Text>{item.text}</Text>
                </View>
                <Text style={{ marginRight: 20 }}>
                  {format(item.createdAt)}
                </Text>
              </View>
            </SafeAreaView>
          );
        }}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
          position: "relative",
        }}
      >
        <TextInput
          placeholder="Enter a Mesage"
          value={msg}
          onChangeText={(val) => setMsg(val)}
          style={{
            borderWidth: 1,
            borderColor: "#000",
            padding: 7,
            width: 350,
            borderRadius: 15,
          }}
        />
        <View
          style={{
            position: "absolute",
            right: 40,
          }}
        >
          <TouchableOpacity onPress={() => sendMsg()}>
            <Text>
              <Send name="send" size={25} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  message: {
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    width: 200,
  },
  CurrentUser: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 10,
  },
  User: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 10,
  },
});
export default Message;
