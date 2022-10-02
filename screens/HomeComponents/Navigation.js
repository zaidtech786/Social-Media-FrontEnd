import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import HomeIcon from "react-native-vector-icons/AntDesign";
import SearchIcon from "react-native-vector-icons/AntDesign";
import Notify from "react-native-vector-icons/Ionicons";
import ShadedHomeIcon from "react-native-vector-icons/Entypo";
import ShadedSearchIcon from "react-native-vector-icons/FontAwesome";
import ShadedNotifyIcon from "react-native-vector-icons/Ionicons";
import News from "react-native-vector-icons/Entypo";
import NewsPaper from "react-native-vector-icons/Ionicons";
import Main from "./Main";
import Search from "./../Search";
import Notifications from "./../Notifications";
import { AuthContext } from "./../Context/useContext";

const Navigation = () => {
  const navigation = useNavigation();
  const [icon, setIcon] = useState("home");
  const { dispatch } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.footer}>
      <TouchableOpacity
        onPress={() => {
          setIcon("home");
          // navigation.navigate("home");
        }}
      >
        {icon === "home" ? (
          <Text>
            <ShadedHomeIcon name="home" size={30} />
          </Text>
        ) : (
          <Text>
            <HomeIcon name="home" size={30} />
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIcon("search");
          navigation.navigate("search");
        }}
      >
        {icon === "search" ? (
          <Text>
            <ShadedSearchIcon name="search" size={30} />
          </Text>
        ) : (
          <Text>
            <SearchIcon name="search1" size={30} />
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIcon("notify");
          navigation.navigate("notification");
          // <Notifications />;
        }}
      >
        {icon === "notify" ? (
          <Text>
            <ShadedNotifyIcon name="notifications" size={30} />
          </Text>
        ) : (
          <Text>
            <Notify name="notifications-outline" size={30} />
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("news");
          setIcon("news");
        }}
      >
        {icon === "news" ? (
          <Text>
            <NewsPaper name="newspaper" size={30} />
          </Text>
        ) : (
          <Text>
            <News name="news" size={30} />
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setIcon("profile");
          navigation.navigate("profile");
        }}
      >
        <Image
          source={require("../../assets/icon.png")}
          style={styles.profile}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  footer: {
    // marginTop: 30,
    backgroundColor: "#f1c40f",
    // paddingTop: 20,
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
  },
});
