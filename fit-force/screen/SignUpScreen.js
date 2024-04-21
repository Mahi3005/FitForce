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

const SignUpScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    userName: "",
    age: 0,
    mobileNumber: 0,
    email: "",
    password: "",
  });
  const [lodding, setLodding] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: "#4cb4d6",
          fontSize: getPerHeight(3),
          fontFamily: "Roboto",
          backgroundColor: "#0f0f0f2b",
          paddingHorizontal: getPerWidth(5),
          paddingVertical: getPerHeight(2),
          borderRadius: 20,
          marginBottom: getPerHeight(3),
        }}
      >
        Happy Life begins with good health!
      </Text>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Enter your username"
          onChangeText={(username) => {
            setUserData((prev) => ({ ...prev, userName: username }));
          }}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          keyboardType="numeric"
          placeholder="Age"
          onChangeText={(age) => {
            setUserData((prev) => ({ ...prev, age: age }));
          }}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          keyboardType="numeric"
          placeholder="Mobile Number"
          onChangeText={(mobileNumber) => {
            setUserData((prev) => ({ ...prev, mobileNumber: mobileNumber }));
          }}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          secureTextEntry={true}
          keyboardType="email-address"
          placeholder="email"
          onChangeText={(email) => {
            setUserData((prev) => ({ ...prev, email: email }));
          }}
        />
      </View>
      <View style={styles.inputBox}>
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
            setLodding(true);
            const response = await fetch(
              "https://fit-force-ai-assistant-backend.onrender.com/users/registerUser",
              {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
              }
            );
            const a = await response.json();
            delete a.password;
            if (a.userName == userData.userName) {
              navigation.navigate("QuestionForm");
              setLodding(false);
            } else {
              setLodding(false);
              Toast.error("Something went wrong!");
            }
            console.log(a);
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          style={[styles.button, styles.createNewAccountButton]}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
    marginTop: getPerHeight(3),
  },
  icon: {
    marginTop: getPerHeight(6) / 6,
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
