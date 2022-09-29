import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "../Profile";
import UserProfile from "../UserProfile";
import axios from "axios";
import Like from "react-native-vector-icons/SimpleLineIcons";
import Comment from "react-native-vector-icons/EvilIcons";
import Share from "react-native-vector-icons/FontAwesome";
import Times from "react-native-vector-icons/FontAwesome";
import Send from "react-native-vector-icons/MaterialIcons";
import Dislike from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "./../Context/useContext";
import LikeComponent from "../LikeComponent";

const Main = () => {
  const [postData, setPostData] = useState([]);
  const [show, setShow] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [comment, setComment] = useState("");
  const [postId, setPostId] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const [commentsCount, setCommentsCount] = useState([]);
  const navigation = useNavigation();
  const { userId } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState();

  const getData = async () => {
    let userData = JSON.parse(await AsyncStorage.getItem("user"));
    axios.get("http://192.168.0.106:5000/api/allpost").then((res) => {
      setPostData(res.data.data);
      console.log("res : ", res.data.data[0].postedBy.profile);
    });
  };

  const likePosts = async (postId) => {
    console.log("Liked post id ", postId);
    let userData = JSON.parse(await AsyncStorage.getItem("user"));
    axios
      .put(`http://192.168.0.106:5000/api/like/${postId}`, {
        userId: userData._id,
      })
      .then((res) => {
        console.log("Response getting from posts", res);
        console.log(res.data.result);

        const newData = postData.map((item) => {
          if (item._id == res.data.result._id) {
            return res.data.result;
          } else {
            return item;
          }
        });
        setPostData(newData);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  const unLikePost = async (postId) => {
    let userData = JSON.parse(await AsyncStorage.getItem("user"));
    // console.log(userData);
    axios
      .put(`http://192.168.0.106:5000/api/unlike/${postId}`, {
        userId: userData._id,
      })
      .then((res) => {
        console.log("Unlike Response : ", res.data.result);
        const newData = postData.map((item) => {
          if (item._id == res.data.result._id) {
            return res.data.result;
          } else {
            return item;
          }
        });
        setPostData(newData);
      })
      .catch((err) => console.log(err));
  };

  const commentPost = async (postId) => {
    let userData = JSON.parse(await AsyncStorage.getItem("user"));
    axios
      .post(`http://192.168.0.106:5000/api/comment`, {
        userId: userData._id,
        comment,
        postId,
      })
      .then((res) => {
        console.log("Comment Response : ", res);
      })
      .catch((err) => console.log(err));
  };

  const getComments = async (postId) => {
    axios
      .get(`http://192.168.0.106:5000/api/getcomments/${postId}`)
      .then((res) => {
        console.log(res);
        // console.log("Length :", res.data.comment.length);
        setCommentsData(res.data.comment);
        setCommentsCount(res.data.comment.length);
      });
  };
  return (
    <>
      <Text>{userId}</Text>
      <FlatList
        data={postData}
        renderItem={({ item, index }) => {
          // console.log("Items are :", item);
          // console.log("Likes :", index, item);
          return (
            <SafeAreaView style={styles.container}>
              <View style={styles.innerCont}>
                <Image
                  source={{ uri: "http://www.gravatar.com/avatar/?d=mp" }}
                  style={styles.profile}
                />
                <Text
                  style={styles.name}
                  onPress={() => {
                    userId === item.postedBy._id
                      ? navigation.navigate("profile")
                      : navigation.navigate("userprofile", {
                          Id: item.postedBy._id,
                        });
                  }}
                >
                  {item.postedBy.userName}
                </Text>
              </View>
              <View style={styles.childCont}>
                <Image source={{ uri: item.image }} style={styles.img} />
                <View style={styles.iconsContainer}>
                  <View style={styles.likeContainer}>
                    {item.likes.includes(userId) ? (
                      <TouchableOpacity>
                        <Dislike
                          name="dislike2"
                          size={30}
                          style={styles.like}
                          onPress={() => {
                            unLikePost(item._id);
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity>
                        <Like
                          name="like"
                          size={30}
                          style={styles.like}
                          onPress={() => {
                            likePosts(item._id);
                          }}
                        />
                      </TouchableOpacity>
                    )}

                    {/* {item.likes.includes(userId) ? (
                      <Text>
                        You and {item.likes.length - 1} others like this post
                      </Text>
                    ) : (
                      <Text></Text>
                    )} */}

                    <Text>{item.likes.length}like</Text>
                  </View>
                  <View style={styles.commentContainer}>
                    <TouchableOpacity>
                      <Comment
                        name="comment"
                        size={40}
                        style={styles.comment}
                        onPress={() => {
                          setPostId(item._id);
                          getComments(item._id);
                          setOpenModel(true);
                        }}
                      />
                    </TouchableOpacity>
                    <Text>{commentsCount}comment</Text>
                  </View>

                  <View style={styles.shareContainer}>
                    <TouchableOpacity>
                      <Share name="share" size={30} style={styles.share} />
                    </TouchableOpacity>

                    <Text>Share </Text>
                  </View>
                </View>
                <View style={styles.discription}>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.content == "" ? "" : item.postedBy.userName + "  "}
                  </Text>
                  <Text>
                    {item.content.length > 25
                      ? item.content.slice(0, 25) + "..."
                      : item.content}
                  </Text>
                </View>
              </View>
            </SafeAreaView>
          );
        }}
      />

      <Modal visible={openModel} animationType="slide">
        <View>
          <TouchableOpacity>
            <Times
              name="times"
              size={30}
              style={{ margin: 20 }}
              onPress={() => setOpenModel(false)}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Write Something here..."
              value={comment}
              onChangeText={(val) => setComment(val)}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 30, top: 5 }}
            >
              <Send name="send" size={25} onPress={() => commentPost(postId)} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={commentsData}
            key={(item) => item._id}
            renderItem={({ item }) => {
              console.log("Render items are Items Are", item);
              return (
                <View style={styles.innerCont}>
                  <Image
                    source={{
                      uri:
                        item.userId.profile == ""
                          ? "http://www.gravatar.com/avatar/?d=mp"
                          : item.userId.profile,
                    }}
                    style={{ width: 25, height: 25, borderRadius: 50 }}
                  />
                  <Text style={{ fontSize: 15, marginLeft: 10 }}>
                    {item.userId.userName}
                  </Text>
                  <Text style={{ marginLeft: 40 }}>{item.comment}</Text>
                </View>
              );
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  innerCont: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: "row",
  },
  name: {
    fontSize: 20,
    marginLeft: 10,
  },
  childCont: {
    marginTop: 10,
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  iconsContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  discription: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 20,
  },
  profile: {
    // marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
  },

  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "black",
    color: "#000",
    borderRadius: 7,
    marginHorizontal: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    // marginBottom: 20,
    // color: "#eee",
    fontSize: 15,
  },
});