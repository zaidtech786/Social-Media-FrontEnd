import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import Like from "react-native-vector-icons/SimpleLineIcons";
import Comment from "react-native-vector-icons/EvilIcons";
import Share from "react-native-vector-icons/FontAwesome";
import Dislike from "react-native-vector-icons/AntDesign";
import Send from "react-native-vector-icons/MaterialIcons";
import AddPostIcon from "react-native-vector-icons/AntDesign";
import Times from "react-native-vector-icons/FontAwesome";
import Delete from "react-native-vector-icons/MaterialIcons";
import ViewPostIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "./Context/useContext";
import { Image } from "react-native";
import { useNavigation, Route, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const UserProfile = ({ route }) => {
  const [userFollowers, setUserFollowers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [followed, setFollowed] = useState(false);
  const navigation = useNavigation();
  const [postId, setPostId] = useState("");
  const { userId } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const { userFollowing, setUserFollowing } = useContext(AuthContext);

  const { Id } = route.params;

  useEffect(() => {
    console.log("userFollowing", userFollowing);
    console.log(Id);
  }, [Id]);

  const getData = () => {
    axios
      .get(`http://192.168.0.105:5000/api/profile/${Id}`)
      .then((res) => {
        setUserData(res.data.user);
        setUserFollowers(res.data.user?.followers);
        console.log("Response :", res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://192.168.0.105:5000/api/mypost/${Id}`)
      .then((res) => {
        console.log("Post Response :", res);
        setPostData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("userInfo", userInfo);
    getData();
  }, []);

  const likePosts = async (postId) => {
    console.log("Liked post id ", postId);
    let userData = JSON.parse(await AsyncStorage.getItem("user"));
    axios
      .put(`http://192.168.0.105:5000/api/like/${postId}`, {
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

  const unLikePost = async (postId) => {
    let userData = JSON.parse(await AsyncStorage.getItem("user"));
    // console.log(userData);
    axios
      .put(`http://192.168.0.105:5000/api/unlike/${postId}`, {
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
      .post(`http://192.168.0.105:5000/api/comment`, {
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
      .get(`http://192.168.0.105:5000/api/getcomments/${postId}`)
      .then((res) => {
        let comments = res.data.comment;
        setCommentsData((prevState) => {
          return {
            ...prevState,
            comments,
          };
        });
      });
  };

  const followUser = async (Id) => {
    console.log("Folow Id ", Id);
    let userData = JSON.parse(await AsyncStorage.getItem("user"));

    axios
      .put(`http://192.168.0.105:5000/api/follow/${Id}`, {
        userId: userData._id,
      })
      .then((res) => {
        console.log("Response getting from Follow", res.data);
        setUserFollowers([...userFollowers, res.data?.user?.followers.length]);
      });
  };

  const unFollowUser = async (Id) => {
    console.log("Folow Id ", Id);
    let userData = JSON.parse(await AsyncStorage.getItem("user"));
    axios
      .put(`http://192.168.0.105:5000/api/unfollow/${Id}`, {
        userId: userData._id,
      })
      .then((res) => {
        console.log("Response getting from unFollow", res);
      });
  };

  const sendMessage = () => {
    axios
      .post("http://192.168.0.105:5000/chat/postid", {
        senderId: userId,
        receiverId: Id,
      })
      .then((res) => console.log(res))
      .catch((Err) => console.log(Err));
  };

  return (
    <>
      <View>
        <View style={{ backgroundColor: "#f1c40f" }}>
          <Text
            style={{
              fontSize: 25,
              marginLeft: 20,
              paddingVertical: 20,
              marginTop: 20,
            }}
          >
            {userData?.userName}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <View>
            <Image
              source={{
                uri: !userData.profile
                  ? "http://www.gravatar.com/avatar/?d=mp"
                  : userData?.profile,
              }}
              style={{
                width: 110,
                height: 110,
                borderRadius: 110 / 2,
                aspectRatio: 1,
                zIndex: 1,
              }}
            />
            <Text
              style={{
                fontWeight: "500",
                marginTop: 10,
                textAlign: "center",
                fontSize: 15,
              }}
            >
              {userData.name}
            </Text>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginLeft: 15,
                padding: 10,
              }}
            >
              <View style={{ marginRight: 15 }}>
                <Text style={{ textAlign: "center", fontWeight: "800" }}>
                  0
                </Text>
                <Text style={{ fontWeight: "400" }}>Posts</Text>
              </View>

              <View style={{ marginRight: 15 }}>
                <Text style={{ textAlign: "center", fontWeight: "800" }}>
                  {userFollowers?.length}
                </Text>
                <Text>followers</Text>
              </View>

              <View style={{ marginRight: 15 }}>
                <Text style={{ textAlign: "center", fontWeight: "800" }}>
                  {userData.followings?.length}
                </Text>
                <Text>Followings</Text>
              </View>
            </View>
            {userInfo?.followings?.includes(Id) ? (
              <TouchableOpacity
                style={styles.followBtn}
                onPress={() => {
                  unFollowUser(Id);
                }}
              >
                <Text>Following</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.followBtn}
                onPress={() => followUser(Id)}
              >
                <Text>Follow</Text>
              </TouchableOpacity>
            )}
            {userData?.followers?.includes(userId) ? (
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 200,
                  height: 30,
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 7,
                }}
                onPress={() => {
                  navigation.navigate("message", {
                    friendId: Id,
                  });
                  sendMessage();
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                  }}
                >
                  Message
                </Text>
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            borderTopWidth: 1,
            marginHorizontal: 20,
            borderColor: "#000",
          }}
        ></View>
      </View>

      {postData.length == 0 ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 50,
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          NO POSTS
        </Text>
      ) : (
        <FlatList
          data={postData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            console.log("item", item);
            return (
              <View>
                <View style={styles.innerCont}>
                  <Image
                    source={{ uri: "http://www.gravatar.com/avatar/?d=mp" }}
                    style={styles.profile}
                  />
                  <Text style={styles.name}>{item.postedBy.userName}</Text>
                  <TouchableOpacity
                    style={styles.name}
                    onPress={() => deletePost(item._id)}
                  >
                    <Delete name="delete" size={25} />
                  </TouchableOpacity>
                </View>
                <Text style={{ marginLeft: 60, position: "absolute", top: 45 }}>
                  23 sept 2022
                </Text>
                <Image
                  source={{
                    uri:
                      item.image == ""
                        ? "http://www.gravatar.com/avatar/?d=mp"
                        : item.image,
                  }}
                  style={{ height: 300, resizeMode: "cover", marginTop: 15 }}
                />

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
                    <Text style={{ fontWeight: "600" }}>
                      {item.likes.length}like
                    </Text>
                  </View>

                  <View style={styles.commentContainer}>
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
                    <Text style={{ textAlign: "center", fontWeight: "600" }}>
                      15 comment
                    </Text>
                  </View>

                  <View style={styles.shareContainer}>
                    <Share name="share" size={30} style={styles.share} />
                    <Text style={{ fontWeight: "600" }}>35 Share </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
      {/* Modal for Comments */}
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
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      marginLeft: 5,
                      marginTop: 6,
                      fontWeight: "500",
                    }}
                  >
                    {item.userId.userName + ":"}
                  </Text>
                  <Text style={{ marginLeft: 5, marginTop: 6 }}>
                    {item.comment}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View
          style={{ flexDirection: "row", position: "relative", marginTop: 610 }}
        >
          <TextInput
            style={styles.input}
            placeholder="Write Something here..."
            value={comment}
            onChangeText={(val) => setComment(val)}
          />
          <TouchableOpacity style={{ position: "absolute", right: 30, top: 5 }}>
            <Send name="send" size={25} onPress={() => commentPost(postId)} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  main: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "relative",
    marginTop: 30,
  },
  name: {
    fontSize: 20,
    marginLeft: 10,
  },
  profile: {
    // marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
  },
  bottomText: {
    fontWeight: "400",
  },
  btn: {
    borderWidth: 1,
    borderColor: "#000",
    width: "60%",
    borderRadius: 5,
    paddingVertical: 3,
    textAlign: "center",
    position: "absolute",
    top: 80,
    left: 130,
    alignSelf: "center",
  },
  postContainer: {
    marginTop: 20,
  },
  iconsContainer: {
    marginTop: 15,
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-around",
    alignItems: "center",
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
    fontSize: 15,
  },
  innerCont: {
    marginTop: 20,
    marginLeft: 20,
    // marginBottom: 20,
    flexDirection: "row",
    position: "relative",
  },
  followBtn: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 30,
    backgroundColor: "#3498db",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 7,
  },
  unfollowBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 30,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 7,
  },
});
