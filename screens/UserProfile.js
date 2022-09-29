import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Like from "react-native-vector-icons/SimpleLineIcons";
import Comment from "react-native-vector-icons/EvilIcons";
import Share from "react-native-vector-icons/FontAwesome";
import AddPostIcon from "react-native-vector-icons/AntDesign";
import ViewPostIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "./Context/useContext";
// import data from "./Data/Data";
import { Image } from "react-native";
import { useNavigation, Route, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const UserProfile = ({ route }) => {
  const [follow, setFollow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const { userId } = useContext(AuthContext);
  const { Id } = route.params;

  const getData = () => {
    axios
      .get(`http://192.168.0.106:5000/api/user/${Id}`)
      .then((res) => {
        setUserData(res.data.data[0].postedBy);
        console.log(res.data.data);
        setPostData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, marginLeft: 15 }}>
          {userData.userName}
        </Text>
        {/* <Text style={{ fontSize: 20, marginLeft: 15 }}>{userId}</Text> */}
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.main}>
          <View style={styles.Profile}>
            <Image
              source={{
                uri:
                  userData.profile == ""
                    ? "http://www.gravatar.com/avatar/?d=mp"
                    : userData.profile,
              }}
              style={styles.img}
            />
            <Text style={{ textAlign: "center", fontWeight: "600" }}></Text>
          </View>

          <View style={styles.posts}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              {postData.length}
            </Text>
            <Text style={styles.bottomText}>Posts</Text>
          </View>

          <View style={styles.follwers}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>0 </Text>
            <Text style={styles.bottomText}>followers</Text>
          </View>

          <View style={styles.following}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>0 </Text>
            <Text style={styles.bottomText}>followings</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={postData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          console.log("item", item);
          return (
            <View>
              <Image
                source={{ uri: item.image }}
                style={{ height: 300, resizeMode: "cover" }}
              />

              <View style={styles.iconsContainer}>
                <View style={styles.likeContainer}>
                  <Like
                    name="like"
                    size={30}
                    backgroundColor="blue"
                    style={styles.like}
                  />
                  <Text style={{ fontWeight: "600" }}>
                    {item.likes.length}like
                  </Text>
                </View>

                <View style={styles.commentContainer}>
                  <Comment name="comment" size={40} style={styles.comment} />
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

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 150,
          left: 150,
        }}
      >
        <TouchableOpacity
          onPress={() => setFollow(!follow)}
          style={follow ? styles.followBtn : styles.unfollowBtn}
        >
          <Text style={{ textAlign: "center", fontWeight: "500" }}>
            {follow ? "Unfollow" : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          // const { image, like } = item;
          return (
            <View>
              <Image
                source={{ uri: item.image }}
                style={{ height: 300, resizeMode: "cover" }}
              />

              <View style={styles.iconsContainer}>
                <View style={styles.likeContainer}>
                  <Like
                    name="like"
                    size={30}
                    backgroundColor="blue"
                    style={styles.like}
                  />
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {item.likes.length}like
                  </Text>
                </View>

                <View style={styles.commentContainer}>
                  <Comment name="comment" size={40} style={styles.comment} />
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
      /> */}
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
  followBtn: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 80,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  unfollowBtn: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 80,
    backgroundColor: "#3498db",
    borderRadius: 10,
  },
});
