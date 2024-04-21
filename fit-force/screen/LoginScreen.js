import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { getPerHeight, getPerWidth } from "../common/common_functions";
import Spinner from "react-native-loading-spinner-overlay";
import ToastManager, { Toast } from "toastify-react-native";

const LoginScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  const [lodding, setLodding] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ToastManager />
      <Text
        style={{
          color: "#4cb4d6",
          fontSize: getPerHeight(3),
          fontFamily: "Roboto",
          backgroundColor: "#0f0f0f2b",
          paddingHorizontal: getPerWidth(5),
          paddingVertical: getPerHeight(2),
          borderRadius: 20,
          marginBottom: getPerHeight(10),
        }}
      >
        Happy Life begins with good health!
      </Text>
      <View style={styles.inputBox}>
        <Image
          style={styles.icon}
          source={require("../assets/img/User_circle.png")}
        />
        <TextInput
          placeholder="Enter your username"
          onChangeText={(username) => {
            setUserData((prev) => ({ ...prev, userName: username }));
          }}
        />
      </View>
      <View style={styles.inputBox}>
        <Image
          style={styles.icon}
          source={require("../assets/img/Password_icon.png")}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => {
            setUserData((prev) => ({ ...prev, password: password }));
          }}
        />
      </View>
      <Spinner
        visible={lodding}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={async () => {
            try {
              setLodding(true);
              const response = await fetch(
                "https://fit-force-ai-assistant-backend.onrender.com/users/loginUser",
                {
                  method: "POST",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userName: userData.userName,
                    password: userData.password,
                  }),
                }
              );
              const a = await response.json();
              delete a.password;
              if (a.userName == userData.userName) {
                setLodding(false);
                navigation.navigate("Drawer");
              } else {
                setLodding(false);
                Toast.error("Please recheck your Username or Password.");
              }
              console.log(a);
            } catch (error) {
              setLodding(false);
              Toast.error("Please recheck your Username or Password.");
            }
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
          style={[styles.button, styles.createNewAccountButton]}
        >
          <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: getPerHeight(10),
    paddingHorizontal: getPerWidth(10),
    height: getPerHeight(100),
    width: getPerWidth(100),
  },
  inputBox: {
    width: getPerWidth(80),
    height: getPerHeight(6),
    borderWidth: 0.5,
    borderColor: "#0f0f0f0",
    borderRadius: 100,
    paddingHorizontal: getPerWidth(5),
    alignContent: "center",
    flexDirection: "row",
    marginTop: getPerHeight(5),
  },
  icon: {
    marginTop: getPerHeight(6) / 4,
    marginRight: getPerWidth(3),
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // White color for text
  },
  loginButton: {
    backgroundColor: "#007bff", // Blue color for login button
  },
  createNewAccountButton: {
    backgroundColor: "#28a745", // Green color for create new account button
  },
});
