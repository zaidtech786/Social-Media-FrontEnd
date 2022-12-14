import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import SignUp from "./SignUp";
import Search from "./Search";
import Profile from "./Profile";
import Chats from "./Chats";
import Home from "./Home";
import News from "./News";
import UserProfile from "./UserProfile";
import Notifications from "./Notifications";
import Main from "./HomeComponents/Main";
import FindPeople from "./FindPeople";
import Message from "./Message";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "./Context/useContext";
import { Apps } from "./Home";
import Upload from "./Upload";
import EditProfile from "./EditProfile";
import Followings from "./Followings";

const AppNav = () => {
  const { userId } = useContext(AuthContext);
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="apps"
      >
        <Stack.Screen name="apps" component={Apps} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="news" component={News} />
        <Stack.Screen name="userprofile" component={UserProfile} />
        <Stack.Screen name="editprofile" component={EditProfile} />
        <Stack.Screen name="upload" component={Upload} />
        <Stack.Screen name="findpeople" component={FindPeople} />
        <Stack.Screen name="notification" component={Notifications} />
        <Stack.Screen name="chat" component={Chats} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="message" component={Message} />
        <Stack.Screen name="followings" component={Followings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
