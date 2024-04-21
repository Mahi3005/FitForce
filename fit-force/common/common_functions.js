import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");
const getPerWidth = (w) => {
  return (width * w) / 100;
};
const getPerHeight = (h) => {
  return (height * h) / 100;
};

export { getPerHeight, getPerWidth };
