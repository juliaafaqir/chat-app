import React, { useState, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { styles } from "../utils/styles";

// AsyncStorage.clear();

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const storeUsername = async () => {
    try {
      await AsyncStorage.setItem("username", username);
      navigation.navigate("Chat");
      console.log(username)
    } catch (e) {
      Alert.alert("Error! While saving username");
    }
  };

  const handleSignIn = () => {
    if (username.trim()) {
      storeUsername();
    } else {
      Alert.alert("Username is required.");
    }
  };

  useLayoutEffect(() => {
    const getUsername = async () => {
      try {
        const value = await AsyncStorage.getItem("username");
        if (value !== null) {
          navigation.navigate("Chat");
        }
      } catch (e) {
        console.error("Error while loading username!");
      }
    };
    getUsername();
  }, []);

  return (
    <View style={styles.loginscreen}>
      <View style={styles.loginscreen}>
        <Text style={styles.loginheading}>Sign in</Text>
        <View style={styles.logininputContainer}>
          <TextInput
            autoCorrect={false}
            placeholder="Enter your username"
            style={styles.logininput}
            onChangeText={(value) => setUsername(value)}
          />
        </View>

        <Pressable onPress={handleSignIn} style={styles.loginbutton}>
          <View>
            <Text style={styles.loginbuttonText}>Get Started</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
