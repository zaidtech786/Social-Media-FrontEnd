import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Upload = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  const pickImage = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!data.cancelled) {
      console.log(data);
      handleUpload(data.uri);
    }
  };

  const handleUpload = async (url) => {
    const data = new FormData();
    data.append("file", url);
    data.append("upload_preset", "Social-Media-App");
    data.append("cloud_name", "abhinhibanaya-com");

    fetch("http://api.cloudinary.com/v1_1/abhinhibanaya-com/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.url);
        console.log(data);
      });
  };

  const PostData = async () => {
    let userData = JSON.parse(await AsyncStorage.getItem("user"));
    if (!image && !content) {
      return Alert.alert("Fill all the credentials");
    }
    axios
      .post("http://192.168.0.106:5000/api/post", {
        image,
        content,
        postedBy: userData._id,
      })
      .then((res) => {
        if (res.success == true) console.log(res);
        Alert.alert(res.data.Message);
        navigation.navigate("home");
      })
      .catch((err) => {
        console.log(err);
        // alert(res.data.err);
      });
  };

  return (
    <View style={styles.wrapper}>
      <View style={{ backgroundColor: "#f1c40f" }}>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            paddingVertical: 20,
            marginTop: 20,
          }}
        >
          Upload
        </Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={() => pickImage()}>
          <View style={styles.imgBox}>
            <Image
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
              source={{
                uri:
                  image == "" ? "http://www.gravatar.com/avatar/?d=mp" : image,
              }}
            />
          </View>
        </TouchableOpacity>

        <View style={{}}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Write Something here..."
            value={content}
            onChangeText={(val) => setContent(val)}
          />
        </View>
      </View>

      <View style={styles.buttonStyle}>
        <Button title="POST" onPress={() => PostData()} />
      </View>
    </View>
  );
};

export default Upload;

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  imgBox: {
    borderWidth: 1,
    borderColor: "#000",
    width: 120,
    height: 120,
    marginRight: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "Black",
    height: 120,
    width: 200,
    fontWeight: "600",
    fontSize: 18,
    padding: 0,
  },
  buttonStyle: {
    marginHorizontal: 20,
  },
});
