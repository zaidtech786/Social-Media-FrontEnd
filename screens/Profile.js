import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Modal,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Like from "react-native-vector-icons/SimpleLineIcons";
import Comment from "react-native-vector-icons/EvilIcons";
import Share from "react-native-vector-icons/FontAwesome";
import AddPostIcon from "react-native-vector-icons/AntDesign";
import ViewPostIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "./Context/useContext";
import { useNavigation } from "@react-navigation/native";
import Dislike from "react-native-vector-icons/AntDesign";
import Send from "react-native-vector-icons/Ionicons";
import Times from "react-native-vector-icons/FontAwesome";
import Delete from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Profile() {
  // (async () => getResponse())();
  const { userId } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  const [comment, setComment] = useState("");
  const navigation = useNavigation();
  const [openModel, setOpenModel] = useState(false);
  const [data, setData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [commentsCount, setCommentsCount] = useState([]);
  const [postId, setPostId] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const id = JSON.parse(await AsyncStorage.getItem("userid"));
    console.log("Saved Data is :", id);

    // Fetching user data
    axios
      .get(`http://192.168.0.105:5000/api/profile/${id}`)
      .then((res) => {
        console.log("User Data is : ", res.data.user);
        setUserInfo(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetching post Data
    axios
      .get(`http://192.168.0.105:5000/api/mypost/${id}`)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  useEffect(() => {
    getData();
  }, []);

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
        console.log(res);
        // console.log("Length :", res.data.comment.length);
        setCommentsData(res.data.comment);
        setCommentsCount(res.data.comment.length);
      });
  };
  const deletePost = async (postId) => {
    axios
      .delete(`http://192.168.0.105:5000/api/deletepost/${postId}`)
      .then((res) => {
        console.log(res.data._id);
        const deletePost = data.filter((item) => {
          return item._id != res.data._id;
        });
        setData(deletePost);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={{ fontSize: 30, marginLeft: 15 }}>
          {userInfo ? userInfo.userName : ""}
        </Text>
        <TouchableOpacity>
          <Text style={{ marginRight: 15 }}>
            <AddPostIcon
              name="plussquareo"
              size={30}
              style={{ borderRadius: 50 }}
              onPress={() => navigation.navigate("upload")}
            />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.main}>
          <View style={styles.Profile}>
            <Image
              source={{
                uri:
                  userInfo.profile == ""
                    ? "http://www.gravatar.com/avatar/?d=mp"
                    : userInfo.profile,
              }}
              style={styles.img}
            />
            <Text style={{ textAlign: "center", fontWeight: "600" }}></Text>
          </View>

          <View style={styles.posts}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              {data.length}
            </Text>
            <Text style={styles.bottomText}>Posts</Text>
          </View>

          <View style={styles.follwers}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              {userInfo.followers?.length}{" "}
            </Text>
            <Text
              style={styles.bottomText}
              onPress={() => {
                navigation.navigate("followings", {
                  userId: userInfo._id,
                  name: "followers",
                });
              }}
            >
              Followers
            </Text>
          </View>

          <View style={styles.following}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              {userInfo.followings?.length}
            </Text>
            <Text
              style={styles.bottomText}
              onPress={() =>
                navigation.navigate("followings", {
                  name: "following",
                })
              }
            >
              followings
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("editprofile", {
              name: userInfo.name,
              userName: userInfo.userName,
              bio: userInfo.bio,
              link: userInfo.link,
            })
          }
        >
          <Text style={{ textAlign: "center", fontWeight: "500" }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linkContainer}>
        <Text style={{ fontWeight: "500", fontSize: 18 }}>{userInfo.name}</Text>
        <Text style={{ fontWeight: "300", fontSize: 15 }}>{userInfo.bio}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(userInfo.link)}>
          <Text style={{ fontWeight: "400", fontSize: 15, color: "blue" }}>
            {userInfo.link}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          // marginTop: 20,
          alignItems: "center",
          borderTopWidth: 1,
          marginHorizontal: 20,
          borderColor: "#000",
        }}
      ></View>

      {data.length == 0 ? (
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
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            // const { image, like } = item;
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
                  source={{ uri: item.image }}
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
                    <Text style={{ textAlign: "center", fontWeight: "600" }}>
                      {commentsCount}comment
                    </Text>
                  </View>

                  <View style={styles.shareContainer}>
                    <Share name="share" size={30} style={styles.share} />
                    <Text style={{ fontWeight: "600" }}>0 Share </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bioContainer: {
    marginLeft: 20,
  },
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
    // marginBottom: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  innerCont: {
    marginTop: 20,
    marginLeft: 20,
    // marginBottom: 20,
    flexDirection: "row",
    position: "relative",
  },
  name: {
    fontSize: 20,
    marginLeft: 10,
  },
  mainContainer: {},
  profile: {
    // marginLeft: 10,
    width: 40,
    height: 40,
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
  linkContainer: {
    marginLeft: 20,
  },
});
