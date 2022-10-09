import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Chats() {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Messages</Text>
        <TouchableOpacity onPress={() => navigation.navigate("message")}>
          <View style={styles.chatSection}>
            <View style={{ flexDirection: "row", position: "relative" }}>
              <TouchableOpacity>
                <Image
                  source={require("../assets/img2.jpeg")}
                  style={styles.img}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 10, fontWeight: "500", fontSize: 20 }}>
                Zaid Siddiqui
              </Text>
            </View>

            <View style={{ position: "absolute", top: 25, left: 60 }}>
              <Text>Last Chat Message 2d</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 20,
  },
  chatSection: {
    marginTop: 20,
    // flexDirection:'row',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
