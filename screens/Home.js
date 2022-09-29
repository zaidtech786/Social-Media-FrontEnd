import { StyleSheet } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./Context/useContext";
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./HomeComponents/Navbar";
import Navigation from "./HomeComponents/Navigation";
import Main from "./HomeComponents/Main";

export const Apps = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState("");

  const retrieveData = async () => {
    const savedData = await AsyncStorage.getItem("token");
    const userData = JSON.parse(await AsyncStorage.getItem("user"));
    console.log("ID: ", userData._id);
    setUserId(userData._id);
    console.log("Saved Data is", savedData);
    console.log("user Data is", userData);
    setToken(savedData);
  };

  retrieveData();

  return <>{token ? <Home /> : <Login />}</>;
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Main />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({});
