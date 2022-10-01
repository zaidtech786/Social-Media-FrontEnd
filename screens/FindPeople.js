import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
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
    <>
      <View style={styles.boxContainer}>
        <FlatList
          numColumns={2}
          style={styles.flatList}
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
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
                      style={{ width: 110, height: 110, borderRadius: 100 }}
                    />
                    <View style={styles.boxBody}>
                      <Text style={{ fontWeight: "600" }}>{item.userName}</Text>
                      <Text>{item.name}</Text>
                      <TouchableOpacity style={styles.btn}>
                        <Text>Follow</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default FindPeople;

const styles = StyleSheet.create({
  boxContainer: {
    // width: "100%",
    // borderWidth: 1,
    // borderColor: "#000",
    // justifyContent: "center",
    marginTop: 20,
    marginLeft: 20,
  },
  box: {
    borderWidth: 1,
    borderColor: "#000",
    width: 150,
    height: 200,
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  boxBody: {
    justifyContent: "center",
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
