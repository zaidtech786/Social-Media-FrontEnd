import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logout from "react-native-vector-icons/AntDesign";
import Chat from "react-native-vector-icons/Ionicons";
import AddPostIcon from "react-native-vector-icons/Ionicons";

const Navbar = () => {
  const navigation = useNavigation();
  const loggedOut = async () => {
    const clearLs = AsyncStorage.clear();
    if (clearLs) {
      navigation.navigate("login");
    } else {
      alert("Storage is not cleared");
      navigation.navigate("home");
    }
  };
  return (
    <View style={styles.navbar}>
      <View style={styles.nav}>
        <Text style={styles.logo}>chattify</Text>
        <Text style={styles.chatIcon}>
          <TouchableOpacity onPress={() => navigation.navigate("upload")}>
            <AddPostIcon
              name="add-circle"
              size={30}
              style={{ paddingHorizontal: 10 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("chat")}>
            <Chat name="md-chatbubble-ellipses-outline" size={30} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Logout name="logout" size={30} onPress={() => loggedOut()} />
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    paddingTop: 35,
    width: "100%",
    height: 100,
    backgroundColor: "#f1c40f",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 25,
    marginLeft: 20,
    marginTop: 12,
  },
  chatIcon: {
    marginRight: 20,
    marginTop: 12,
  },

  //   innerCont: {
  //     marginTop: 20,
  //     marginLeft: 20,
  //     flexDirection: "row",
  //   },
});
