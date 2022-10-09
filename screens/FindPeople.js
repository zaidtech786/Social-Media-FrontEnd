import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

const FindPeople = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  const getData = async () => {
    axios.get("http://192.168.0.106:5000/api/allusers").then((res) => {
      setUsers(res.data.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <View style={styles.boxContainer}>
        <FlatList
          numColumns={2}
          style={styles.flatList}
          data={users}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <SafeAreaView>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 5,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("userprofile", {
                        Id: item._id,
                      })
                    }
                  >
                    <View style={styles.box}>
                      <Image
                        source={{
                          uri:
                            item.profile == ""
                              ? "http://www.gravatar.com/avatar/?d=mp"
                              : item.profile,
                        }}
                        style={{
                          width: 110,
                          height: 110,
                          borderRadius: 110 / 2,
                          aspectRatio: 1,
                          zIndex: 1,
                        }}
                      />
                      <View style={styles.boxBody}>
                        <Text style={{ fontWeight: "600", fontSize: 16 }}>
                          {item.userName}
                        </Text>
                        <Text>{item.name}</Text>
                        <TouchableOpacity style={styles.btn}>
                          <Text>Follow</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            );
          }}
        />
      </View>
    </View>
  );
};

export default FindPeople;

const styles = StyleSheet.create({
  boxContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    borderWidth: 1,
    borderColor: "#000",
    width: 165,
    height: 230,
    borderRadius: 5,
    // padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  boxBody: {
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
  btn: {
    marginTop: 5,
    backgroundColor: "#3498db",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 7,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
});
