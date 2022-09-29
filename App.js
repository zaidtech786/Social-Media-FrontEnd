import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "./screens/Context/useContext";
import { AuthProvider } from "./screens/Context/useContext";
import AppNav from "./screens/AppNav";

export default function App() {
  // const AuthContext = createContext({});
  // const { AuthProvider } = useContext(AuthContext);
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
