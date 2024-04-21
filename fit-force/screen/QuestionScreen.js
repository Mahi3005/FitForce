import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getPerHeight } from "../common/common_functions";

const QuestionScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    mentalHealthRating: "",
    physicalHealthRating: "",
    mentalHealthFactors: "",
    physicalHealthFactors: "",
    stressFrequency: "",
    sleepQuality: "",
    previousAppsUsed: "",
    motivationLevel: "",
    wellnessActivities: "",
    challenges: "",
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    navigation.navigate("Drawer");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[styles.heading, { marginTop: getPerHeight(10) }]}>
          Wellness Survey
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Rate your current mental health (1-10)"
          keyboardType="numeric"
          value={formData.mentalHealthRating}
          onChangeText={(text) => handleChange("mentalHealthRating", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Rate your current physical health (1-10)"
          keyboardType="numeric"
          value={formData.physicalHealthRating}
          onChangeText={(text) => handleChange("physicalHealthRating", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Factors contributing to mental well-being"
          value={formData.mentalHealthFactors}
          onChangeText={(text) => handleChange("mentalHealthFactors", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Factors contributing to physical well-being"
          value={formData.physicalHealthFactors}
          onChangeText={(text) => handleChange("physicalHealthFactors", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Frequency of stress or anxiety"
          value={formData.stressFrequency}
          onChangeText={(text) => handleChange("stressFrequency", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sleep quality"
          value={formData.sleepQuality}
          onChangeText={(text) => handleChange("sleepQuality", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Previous mental health apps used"
          value={formData.previousAppsUsed}
          onChangeText={(text) => handleChange("previousAppsUsed", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Motivation level for health improvement"
          value={formData.motivationLevel}
          onChangeText={(text) => handleChange("motivationLevel", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Current wellness activities"
          value={formData.wellnessActivities}
          onChangeText={(text) => handleChange("wellnessActivities", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Challenges faced in health improvement"
          value={formData.challenges}
          onChangeText={(text) => handleChange("challenges", text)}
        />

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default QuestionScreen;
