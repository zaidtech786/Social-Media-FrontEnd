import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Eye from "react-native-vector-icons/FontAwesome5";
import User from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "./Context/useContext";
import axios from "axios";
import { Apps } from "./Home";
import * as SecureStore from "expo-secure-store";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // const { loggedIn } = useContext(AuthContext);
  // const { setUserToken } = useContext(AuthContext);
  // const { userToken } = useContext(AuthContext);
  // const { data } = useContext(AuthContext);
  // const { setUserData } = useContext(AuthContext);
  // const { userData } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  const PostData = async () => {
    setLoading(true);
    axios
      .post("http://192.168.0.105:5000/api/signin", {
        userName,
        password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.token);
        if (res.data.token) {
          // alert("Login Successfull");
          setLoading(false);
          AsyncStorage.setItem("user", JSON.stringify(res.data.user));
          AsyncStorage.setItem("token", JSON.stringify(res.data.token));
          AsyncStorage.setItem("userid", JSON.stringify(res.data.user._id));
          dispatch({ type: "USER", payload: res.data.user });
          navigation.navigate("home");
        } else {
          alert("Please Enter Correct Details");
        }
      })
      // .then((data) => console.log(data, data.token))
      .catch((err) => {
        console.log(err);
        navigation.navigate("login");
      });
    setLoading(false);
  };

  return (
    <View style={styles.Wrapper}>
      <View style={styles.container}>
        <Text style={styles.logo}>Chattify</Text>
        <Text style={styles.logo}>{}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Username or Mobile Number</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.icon}>
              <User name="user" size={15} color={"black"} />
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={userName}
              onChangeText={(user) => setUserName(user)}
            />
          </View>

          <Text style={styles.label}>Enter Password</Text>
          <View style={styles.inputGroup}>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 20,
                top: 12,
                fontWeight: "500",
              }}
              onPress={() => setShow(!show)}
            >
              <Text>
                <Eye
                  name={show ? "eye" : "eye-slash"}
                  style={styles.icon}
                  size={15}
                  color="#000"
                />
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              secureTextEntry={show ? false : true}
              placeholder="Password"
              value={password}
              onChangeText={(pass) => setPassword(pass)}
            />
          </View>

          <TouchableOpacity onPress={() => PostData()} style={styles.btn}>
            {loading ? (
              <View>
                <Text>
                  <ActivityIndicator size="small" color="#000" />
                </Text>
              </View>
            ) : (
              <Text style={{ textAlign: "center", fontWeight: "500" }}>
                Login
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.lastContainer}>
          <Text style={styles.signup}>
            Don't have an account?
            <TouchableOpacity
              style={{
                fontWeight: "bold",
                borderBottomWidth: 1,
                position: "absolute",
                top: 20,
                borderColor: "#000",
              }}
              onPress={() => navigation.navigate("signup")}
            >
              <Text style={{ fontWeight: "600" }}>sign up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f1c40f",
  },
  container: {
    marginTop: 200,
  },
  logo: {
    textAlign: "center",
    fontSize: 35,
    marginBottom: 30,
  },
  inputContainer: {
    marginHorizontal: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 7,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#eee",
    fontSize: 15,
  },
  label: {
    marginBottom: 5,
  },
  // bottomView: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 20,
  // },
  Or: {
    marginTop: 10,
  },
  btn: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 80,
    backgroundColor: "#f1c40f",
    borderRadius: 10,
  },
  lastContainer: {
    display: "flex",
    marginTop: 20,
    alignItems: "center",
    borderTopWidth: 1,
    marginHorizontal: 30,
    borderColor: "#000",
    position: "relative",
  },
  inputGroup: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
});
