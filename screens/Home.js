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
  const { userInfo } = useContext(AuthContext);

  return <>{userInfo ? <Home /> : <Login />}</>;
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
