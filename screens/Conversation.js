import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { io } from "socket.io-client";
import { AuthContext } from "./Context/useContext";

const Conversation = ({ conversation, currentUser, msg }) => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [friendId, setFriendId] = useState([]);
  const [user, setUser] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  // useEffect(() => {
  //   console.log("MSG", msg);
  //   socket.current = io("ws://localhost:3000");
  // }, []);

  // useEffect(() => {
  //   arrivalMessage &&
  //     conversation?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, conversation]);

  // useEffect(() => {
  //   socket.current.emit("addUser", currentUser);
  //   socket.current.on("getUsers", (users) => {
  //     setOnlineUsers(
  //       userInfo.followings.filter((f) => users.some((u) => u.userId === f))
  //     );
  //   });
  // }, [userInfo]);

  // const receiverId = conversation.members.find(
  //   (member) => member !== currentUser
  // );

  //

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
    setFriendId(friendId);
    console.log("Friend ", friendId);

    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://192.168.0.105:5000/api/profile/${friendId}`
        );
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  const getMessages = async (conversationId) => {
    console.log("conversationId", conversationId);
    try {
      const res = await axios.get(
        `http://192.168.0.105:5000/chat/getmessage/${conversationId}`
      );
      console.log(res);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={styles.chatSection}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("message", {
              conversationId: conversation._id,
              friendId: friendId,
            });
            getMessages(conversation._id);
          }}
        >
          <View style={styles.userProfile}>
            <Image
              source={{
                uri: user?.profile,
              }}
              style={styles.profile}
            />
            <View style={styles.nameUser}>
              <Text style={{ fontWeight: "400", fontSize: 18 }}>
                {user?.name}
              </Text>
              <Text style={{ fontWeight: "500" }}>{user?.userName}</Text>
            </View>
          </View>
          {/* <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: user?.profile }} style={styles.img} />
            <Text style={{ marginLeft: 10, fontWeight: "500", fontSize: 20 }}>
              {user?.name}
            </Text>
          </View> */}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  // chatSection: {
  //   marginTop: 20,
  //   marginLeft: 20,
  // },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userProfile: {
    marginLeft: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  nameUser: {
    marginLeft: 10,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
  },
});
