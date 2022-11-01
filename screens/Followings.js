import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./Context/useContext";
import { useNavigation } from "@react-navigation/native";

const Followings = ({ route }) => {
  const { userId } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  const [followersInfo, setFollowersInfo] = useState([]);
  const { name } = route.params;

  const navigation = useNavigation();

  const getData = () => {
    axios
      .get(`http://192.168.0.105:5000/api/profile/${userId}`)
      .then((res) => {
        console.log("User Data is : ", res.data.user?.followings);
        setUserInfo(res.data.user?.followings);
        setFollowersInfo(res.data.user?.followers);
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
      <View style={{ backgroundColor: "#f1c40f", paddingVertical: 20 }}>
        <Text
          style={{
            alignSelf: "center",
            marginTop: 40,
            fontSize: 30,
            backgroundColor: "#f1c40f",
          }}
        >
          {name === "following" ? "Followings" : "Followers"}
        </Text>
      </View>

      {name === "following" ? (
        <FlatList
          data={userInfo}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <View style={styles.userProfile}>
                <Image
                  source={{
                    uri: "http://www.gravatar.com/avatar/?d=mp",
                  }}
                  style={styles.profile}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("userprofile", {
                      Id: item._id,
                    })
                  }
                >
                  <View style={styles.nameUser}>
                    <Text style={{ fontWeight: "500" }}>{item.userName}</Text>
                    <Text style={{ fontWeight: "400" }}> {item.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <FlatList
          data={followersInfo}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <View style={styles.userProfile}>
                <Image
                  source={{
                    uri: "http://www.gravatar.com/avatar/?d=mp",
                  }}
                  style={styles.profile}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("userprofile", {
                      Id: item._id,
                    })
                  }
                >
                  <View style={styles.nameUser}>
                    <Text style={{ fontWeight: "500" }}>{item.userName}</Text>
                    <Text style={{ fontWeight: "400" }}> {item.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </>
  );
};

export default Followings;

const styles = StyleSheet.create({
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
