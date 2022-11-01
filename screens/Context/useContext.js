import React from "react";
import { createContext, useState, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Reducer } from "./Reducer";

export const AuthContext = React.createContext({});
export const initialState = null;

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);

  const getData = async () => {
    let userId = JSON.parse(await AsyncStorage.getItem("userid"));
    let userData = JSON.parse(await AsyncStorage.getItem("user"));
    setUserFollowing(userData.followings);
    setUserInfo(userData);
    setUserId(userId);
  };

  useEffect(() => {
    console.log("State :", state);
    getData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        userInfo,
        userFollowing,
        setUserFollowing,
        dispatch,
        state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
