import MainContext from "./MainContext";
import { useState } from "react";

export default function MainState(props) {
  const [chats, setChats] = useState(Array());
  // ----------------------------------------------------------------
  return (
    <MainContext.Provider value={{ chats, setChats }}>
      {props.children}
    </MainContext.Provider>
  );
}
