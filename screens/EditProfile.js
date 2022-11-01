import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Times from "react-native-vector-icons/FontAwesome";
import Check from "react-native-vector-icons/Feather";
import { useNavigation, Route, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
// import { AlexBrush_400Regular } from "@expo-google-fonts/alex-brush";
// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";
import { AuthContext } from "./Context/useContext";

const EditProfile = ({ route }) => {
  const getData = (type) => {
    if (route.params) {
      switch (type) {
        case "name":
          return route.params.name;
        case "userName":
          return route.params.userName;
        case "bio":
          return route.params.bio;
        case "link":
          return route.params.link;
      }
    }
    return "";
  };

  const Navigation = useNavigation();
  const [userInfo, setUserInfo] = useState([]);
  const [names, setNames] = useState(getData("name"));
  const [userNames, setUserNames] = useState(getData("userName"));
  const [bios, setBio] = useState(getData("bio"));
  const [profile, setProfile] = useState();
  const [links, setLink] = useState(getData("link"));

  const { name, userName, bio, link } = route.params;
  console.log("name :", name, "userName :", userName);

  const pickImage = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!data.cancelled) {
      handleUpload(data.uri);
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Social-Media-App");
    data.append("cloud_name", "abhinhibanaya-com");

    fetch("http://api.cloudinary.com/v1_1/abhinhibanaya-com/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfile(data.url);
      });
  };

  const PostData = async () => {
    console.log(userNames, names, bios, links);
    const id = JSON.parse(await AsyncStorage.getItem("userid"));
    axios
      .put(`http://192.168.0.105:5000/api/update/${id}`, {
        userNames,
        names,
        bios,
        links,
      })
      .then((res) => {
        console.log(res.data.user);
        AsyncStorage.setItem("updatedUser", JSON.stringify(res.data.user));
        Navigation.navigate("home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          paddingTop: 40,
          backgroundColor: "#f1c40f",
          paddingVertical: 30,
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => Navigation.goBack(null)}>
          <Times name="times" size={30} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginTop: 10 }}>Edit Profile</Text>
        <TouchableOpacity onPress={() => PostData()}>
          <Check name="check" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => pickImage()}>
          <Image
            source={{
              uri:
                userInfo.profile == ""
                  ? "http://www.gravatar.com/avatar/?d=mp"
                  : userInfo.profile,
            }}
            style={styles.profile}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage()}>
          <Text style={{ marginTop: 10, fontSize: 20, color: "#2980b9" }}>
            Change Profile Photo
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={{ color: "#2980b9" }}>Name</Text>
          <TextInput
            style={styles.input}
            value={names}
            name="name"
            onChangeText={(val) => setNames(val)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={{ color: "#2980b9" }}>UserName</Text>
          <TextInput
            style={styles.input}
            value={userNames}
            onChangeText={(val) => setUserNames(val)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={{ color: "#2980b9" }}>Add Bio</Text>
          <TextInput
            style={styles.input}
            value={bios}
            name="bio"
            onChangeText={(val) => setBio(val)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={{ color: "#2980b9" }}>Add Link</Text>
          <TextInput
            style={styles.input}
            value={links}
            name="link"
            onChangeText={(val) => setLink(val)}
          />
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
  },
  topContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  formContainer: {
    marginTop: 20,
  },
  inputGroup: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
