import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Conversation from "./Conversation";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "./Context/useContext";
import SearchIcon from "react-native-vector-icons/Feather";
import Times from "react-native-vector-icons/FontAwesome";
import axios from "axios";

export default function Chats() {
  const { userId } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://192.168.0.105:5000/chat/getconversation/" + userId
        );
        console.log(res.data);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  const getData = async () => {
    axios.get("http://192.168.0.105:5000/api/allusers").then((res) => {
      setUsers(res.data.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const ClearData = () => {
    setSearch("");
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

  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text style={{ fontSize: 23, fontWeight: "600", marginLeft: 20 }}>
          Messages
        </Text>

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
                        <Text style={{ fontWeight: "500" }}>
                          {item.userName}
                        </Text>
                        <Text style={{ fontWeight: "400" }}> {item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          ) : (
            <Text></Text>
          )}
        </View>

        {conversations.map((c) => (
          <View key={c._id}>
            <Conversation conversation={c} currentUser={userId} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
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

  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
  },
  userProfile: {
    marginTop: 20,
    marginLeft: 20,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  nameUser: {
    marginLeft: 10,
  },
});
