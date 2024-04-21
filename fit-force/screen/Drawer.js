import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Image,
  DrawerLayoutAndroid,
  TouchableOpacity,
} from "react-native";
import { getPerHeight, getPerWidth } from "../common/common_functions";
import MainContext from "../context/MainContext";
import CommunityScreen from "../components/CommunityScreen";

const Drawer = () => {
  const drawerRef = React.createRef();
  const pages = Object({
    CHAT: "Chat Bot",
    COMMUNITY: "Community",
    TRAINER: "Parsonalized Trainer",
    PROFILE: "User Profile",
  });
  const [currentPage, setCurrentPage] = useState(pages.CHAT);
  const { chats, setChats } = useContext(MainContext);
  const chatListRef = useRef(null);
  useEffect(() => {
    console.log(currentPage);
    drawerRef.current.closeDrawer();
  }, [currentPage]);
  useEffect(() => {
    chatListRef.current.scrollToEnd({ animated: true });
  }, [chats]);
  const renderItem = ({ item }) => {
    if (item.res_from == "user") {
      return (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            marginRight: getPerWidth(2),
          }}
        >
          <View style={styles.userChat}>
            <Text>{item.text}</Text>
          </View>
          <Image source={require("../assets/img/User_circle.png")}></Image>
        </View>
      );
    } else if (item.res_from == "bot") {
      return (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
            marginLeft: getPerWidth(2),
          }}
        >
          <Image source={require("../assets/img/ai_icon.png")}></Image>
          <View style={styles.botChat}>
            <Text>{item.text}</Text>
          </View>
        </View>
      );
    }
  };
  const [userInput, setuserInput] = useState("");
  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };

  const navigationView = (
    <View style={styles.drawerContainer}>
      <TouchableOpacity
        style={styles.drawerMenu}
        onPress={() => {
          setCurrentPage(pages.CHAT);
        }}
      >
        <Text>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerMenu}
        onPress={() => {
          setCurrentPage(pages.COMMUNITY);
        }}
      >
        <Text>Community</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerMenu}
        onPress={() => {
          setCurrentPage(pages.TRAINER);
        }}
      >
        <Text>Personalized Trainer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerMenu}
        onPress={() => {
          setCurrentPage(pages.PROFILE);
        }}
      >
        <Text>User Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={200}
      drawerPosition="left"
      renderNavigationView={() => navigationView}
    >
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#007bff",
            width: getPerWidth(100),
            height: getPerHeight(11),
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={openDrawer} style={styles.drawerIcon}>
            <Image
              source={require("../assets/img/menu_icon.png")}
              style={styles.drawerIconImage}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: getPerHeight(2),
              marginLeft: getPerWidth(30),
              marginTop: getPerHeight(3),
            }}
          >
            {currentPage}
          </Text>
        </View>
        {currentPage == pages.CHAT ? (
          <View style={{ height: getPerHeight(87) }}>
            <FlatList
              ref={chatListRef}
              style={{ marginTop: getPerHeight(1) }}
              data={chats}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={userInput}
                onChangeText={setuserInput}
                placeholder="Type your message..."
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={async () => {
                  if (!userInput) return;

                  setChats((prevChats) => [
                    ...prevChats,
                    { res_from: "user", text: userInput },
                  ]);

                  const bot_response = await fetch(
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCku5nwEptm02pQzd203vgdrQskShPyK6Y",
                    {
                      method: "POST",
                      body: JSON.stringify({
                        contents: [
                          {
                            parts: [{ text: userInput }],
                          },
                        ],
                      }),
                    }
                  );
                  const data = await bot_response.json();
                  setChats((prev) => [
                    ...prev,
                    {
                      res_from: "bot",
                      text: data.candidates[0].content.parts[0].text,
                    },
                  ]);
                  setuserInput("");
                }}
              >
                <Image source={require("../assets/img/send.png")} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {currentPage == pages.COMMUNITY ? <CommunityScreen /> : null}
        {currentPage == pages.TRAINER ? (
          <View>
            <Text>{currentPage}</Text>
          </View>
        ) : null}
        {currentPage == pages.PR ? (
          <View>
            <Text>{currentPage}</Text>
          </View>
        ) : null}
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  message: {
    flexDirection: "row",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  userMessage: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-end",
  },
  aiMessage: {
    backgroundColor: "#ddd",
    alignSelf: "flex-start",
  },
  messageText: {
    flex: 1,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    height: getPerHeight(5),
    borderRadius: 5,
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  drawerItem: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  drawerIcon: {
    zIndex: 1,
  },
  drawerIconImage: {
    width: 30,
    height: 30,
    marginTop: getPerHeight(3),
    marginLeft: getPerWidth(5),
  },
  sendButton: {
    backgroundColor: "#007bff",
    width: getPerWidth(15),
    height: getPerHeight(5),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  userChat: {
    backgroundColor: "#cdcdcd",
    width: getPerWidth(60),
    marginBottom: getPerHeight(3),
    marginRight: getPerWidth(3),
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: 10,
  },
  botChat: {
    backgroundColor: "#83d56a",
    width: getPerWidth(60),
    marginBottom: getPerHeight(3),
    marginLeft: getPerWidth(3),
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: 10,
  },
  drawerMenu: {
    backgroundColor: "#ececec",
    padding: 15,
    borderRadius: 13,
    alignItems: "center",
    marginTop: getPerHeight(1),
  },
});

export default Drawer;
