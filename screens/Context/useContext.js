import React from "react";
import { createContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  const getData = async () => {
    let userId = await AsyncStorage.getItem("userid");
    let userData = JSON.parse(await AsyncStorage.getItem("user"));
    setUserInfo(userData.userName);
    setUserId(userData._id);
  };
  getData();

  return (
    <AuthContext.Provider
      value={{
        userId: userId,
        userInfo: userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
