const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0, // Optional: Enforce minimum age
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true, // Optional: Enforce unique mobile number
  },
  email: {
    type: String,
    required: true,
    unique: true, // Optional: Enforce unique email address
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Optional: Enforce minimum password length
  },
  userSate: {
    type: Object,
    default: null,
    mentalHealthRating: {
      type: Number,
      min: 1,
      max: 10,
    },
    physicalHealthRating: {
      type: Number,
      min: 1,
      max: 10,
    },
    mentalHealthFactors: String,
    physicalHealthFactors: String,
    stressFrequency: String,
    sleepQuality: String,
    previousAppsUsed: String,
    motivationLevel: String,
    wellnessActivities: String,
    challenges: String,
  },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
