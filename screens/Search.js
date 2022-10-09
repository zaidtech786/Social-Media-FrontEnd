import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "react-native-vector-icons/Feather";
import AddPostIcon from "react-native-vector-icons/Ionicons";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Times from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import FindPeople from "./FindPeople";
import { AuthContext } from "./Context/useContext";

export default function Search() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const { state } = useContext(AuthContext);
  const navigation = useNavigation();

  const getData = async () => {
    axios.get("http://192.168.0.106:5000/api/allusers").then((res) => {
      setUsers(res.data.data);
      console.log(res.data);

      //  console.log("res : ", res.data.data[0].postedBy.profile);
    });
  };

  const getSearchData = (val) => {
    let newData = users.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    if (search === "") {
      setFilterData([]);
    } else {
      setFilterData(newData);
    }
  };

  const ClearData = () => {
    setSearch("");
  };

  useEffect(() => {
    console.log(state);
    getData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputGrp}>
          {search == "" ? (
            <SearchIcon
              name="search"
              size={20}
              style={{ marginLeft: 10, textAlign: "center", marginTop: 3 }}
            />
          ) : (
            <TouchableOpacity onPress={() => ClearData()}>
              <Times
                name="times"
                size={20}
                style={{ marginLeft: 10, textAlign: "center", marginTop: 3 }}
              />
            </TouchableOpacity>
          )}

          <TextInput
            placeholder="search"
            style={styles.search}
            value={search}
            onChangeText={(val) => {
              setSearch(val);
              console.log(val);
              getSearchData();
            }}
          />
        </View>

        {search ? (
          <FlatList
            data={filterData}
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
        ) : (
          <FindPeople />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
  },
  inputGrp: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    marginHorizontal: 20,
    borderRadius: 7,
    paddingVertical: 5,
  },
  search: {
    paddingHorizontal: 15,
    fontSize: 18,
  },
  // imageContainer: {
  //   marginTop: 10,
  //   flexDirection: "row",
  //   flex: 1,
  // },
  // image: {
  //   width: 120,
  //   height: 120,
  //   resizeMode: "cover",
  // },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
  },
  userProfile: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  nameUser: {
    marginLeft: 10,
  },
});
