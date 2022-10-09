import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Send from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";

const Message = () => {
  const [data, setData] = useState([
    {
      id: 1,
      text: "hello",
    },
    {
      id: 2,
      text: "Heyy",
    },
    {
      id: 3,
      text: "WhatsaUpp",
    },
    {
      id: 4,
      text: "Alhamdulillah",
    },
    {
      id: 5,
      text: "What about You ? ",
    },
    {
      id: 6,
      text: "What about You ? ",
    },
    {
      id: 7,
      text: "What about You ? ",
    },
    {
      id: 8,
      text: "What about You ? ",
    },
    {
      id: 9,
      text: "What about You ? ",
    },
    {
      id: 10,
      text: "What about You ? ",
    },
    {
      id: 11,
      text: "What about You ? ",
    },
    {
      id: 12,
      text: "What about You ? ",
    },
    {
      id: 13,
      text: "What about You ? ",
    },
    {
      id: 14,
      text: "What about You ? ",
    },
  ]);
  return (
    <>
      <View style={{ backgroundColor: "#f1c40f", paddingVertical: 20 }}>
        <Text
          style={{
            alignSelf: "center",
            marginTop: 30,
            fontSize: 20,
            backgroundColor: "#f1c40f",
          }}
        >
          Zaid Siddiqi
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(key) => key.id}
        renderItem={({ item }) => {
          return (
            <SafeAreaView>
              <View
                style={{
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  margin: 10,
                }}
              >
                <View style={styles.message}>
                  <Text>{item.text}</Text>
                </View>
                <Text style={{ marginRight: 20 }}> 8:30 Am</Text>
              </View>
            </SafeAreaView>
          );
        }}
      />

      <Textinput />
    </>
  );
};

export const Textinput = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        position: "relative",
      }}
    >
      <TextInput
        placeholder="Enter a Mesage"
        style={{
          borderWidth: 1,
          borderColor: "#000",
          padding: 7,
          width: 350,
          borderRadius: 15,
        }}
      />
      <View style={{ position: "absolute", marginLeft: 50 }}>
        <TouchableOpacity>
          <Text>
            <Send name="send" size={25} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    // margin: 10,
    width: 200,
  },
});
export default Message;
