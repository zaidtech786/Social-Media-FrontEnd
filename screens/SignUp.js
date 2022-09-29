import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icons from "react-native-vector-icons/FontAwesome";
import Eye from "react-native-vector-icons/FontAwesome5";
import Camera from "react-native-vector-icons/AntDesign";
import Email from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const SignupSchema = Yup.object().shape({
    username: Yup.string().min(4).max(20).required("Please Enter Username"),
    name: Yup.string().min(7).max(20).required("Please Enter Name"),
    email: Yup.string().email("Invalid email").required("Please Enter Email"),
    password: Yup.string()
      .min(8)
      .required("Please Enter password")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be strong"
      ),
    conPassword: Yup.string()
      .min(8)
      .oneOf([Yup.ref("password")], "Your Password do not match.")
      .required("Confirm password is required"),
  });

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
      .then((data) => setProfile(data.url));
  };

  const PostData = () => {
    setLoading(true);
    axios
      .post("http://192.168.0.106:5000/api/signup", {
        username,
        name,
        email,
        password,
        confirmPassword,
        profile,
      })
      .then((res) => {
        console.log(res);
        // alert(res.data.message);
        navigation.navigate("login");
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  return (
    <View>
      <View style={styles.Wrapper}>
        <View style={styles.container}>
          <Text style={styles.logo}>Chattify</Text>

          <Formik
            initialValues={{
              username: "",
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              profile: "",
            }}
            validationSchema={SignupSchema}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              setFieldTouched,
              isValid,
            }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter Username </Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.icon}>
                    <Eye name="user" size={15} color={"black"} />
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={values.username}
                    onChangeText={handleChange("username")}
                    onBlur={() => setFieldTouched("username")}
                  />
                  {touched.username && errors.username && (
                    <Text
                      style={{
                        color: "red",
                        fontWeight: "500",
                        marginBottom: 5,
                      }}
                    >
                      {"***" + errors.username}
                    </Text>
                  )}
                </View>

                <Text style={styles.label}>Enter Name </Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.icon}>
                    <Eye name="user" size={15} color={"black"} />
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={() => setFieldTouched("name")}
                  />
                  {touched.name && errors.name && (
                    <Text
                      style={{
                        color: "red",
                        fontWeight: "500",
                        marginBottom: 5,
                      }}
                    >
                      {"***" + errors.name}
                    </Text>
                  )}
                </View>

                <Text>Enter Email</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.icon}>
                    <Email name="email" size={15} color={"black"} />
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="xyz@gmail.com"
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                  />
                  {touched.email && errors.email && (
                    <Text
                      style={{
                        color: "red",
                        fontWeight: "500",
                        marginBottom: 5,
                      }}
                    >
                      {"***" + errors.email}
                    </Text>
                  )}
                </View>

                <Text style={styles.label}>Enter Password</Text>
                <View style={styles.inputGroup}>
                  <TouchableOpacity onPress={() => setShow(true)}>
                    <Eye
                      name={show ? "eye" : "eye-slash"}
                      style={styles.icon}
                      size={15}
                      color={"black"}
                    />
                  </TouchableOpacity>

                  <TextInput
                    style={styles.input}
                    secureTextEntry={show ? false : true}
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={() => setFieldTouched("password")}
                  />
                  {touched.password && errors.password && (
                    <Text
                      style={{
                        color: "red",
                        fontWeight: "500",
                        marginBottom: 5,
                      }}
                    >
                      {"***" + errors.password}
                    </Text>
                  )}
                </View>

                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputGroup}>
                  <TouchableOpacity onPress={() => setShow(true)}>
                    <Eye
                      name={show ? "eye" : "eye-slash"}
                      style={styles.icon}
                      size={15}
                      color={"black"}
                    />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    secureTextEntry={show ? false : true}
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={() => setFieldTouched("confirmPassword")}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text
                      style={{
                        color: "red",
                        fontWeight: "500",
                        marginBottom: 5,
                      }}
                    >
                      {"***" + errors.confirmPassword}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                >
                  <TouchableOpacity onPress={() => pickImage()}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>Upload Profile Pic</Text>
                      <Text>
                        <Camera
                          name={profile == "" ? "camera" : "checkcircle"}
                          size={20}
                        />
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => PostData()} style={styles.btn}>
                  <Text style={{ alignSelf: "center" }}>
                    {loading ? (
                      <View>
                        <Text>
                          <ActivityIndicator size="small" color="#000" />
                        </Text>
                      </View>
                    ) : (
                      <Text style={{ fontWeight: "500" }}>Sign Up</Text>
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          <View style={styles.lastContainer}>
            <Text style={styles.signup}>
              Already have an account?
              <Text
                style={{
                  fontWeight: "bold",
                  borderBottomWidth: 1,
                  borderColor: "#000",
                }}
                onPress={() => navigation.navigate("login")}
              >
                Sign in
              </Text>
            </Text>
          </View>
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
    marginTop: 150,
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
    // marginBottom: 20,
    color: "#000",
    fontSize: 15,
  },
  label: {
    marginBottom: 5,
  },
  bottomView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
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
  },
  inputGroup: {
    position: "relative",
    marginBottom: 10,
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
});