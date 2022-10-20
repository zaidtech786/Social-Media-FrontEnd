import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Followings = ({ route }) => {
  const { userId } = route.params;
  const [userInfo, setUserInfo] = useState([]);

  const getData = () => {
    axios
      .get(`http://192.168.0.106:5000/api/profile/${userId}`)
      .then((res) => {
        console.log("User Data is : ", res.data.user);
        setUserInfo(res.data.user.Followings);
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
          Followings
        </Text>
      </View>

      <FlatList
        data={userInfo}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <View style={styles.userProfile}>
              <Image
                source={{
                  uri:
                    item.profile == ""
                      ? "http://www.gravatar.com/avatar/?d=mp"
                      : item.profile,
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
    </>
  );
};

export default Followings;

const styles = StyleSheet.create({});
