const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");

const UserRouter = require("express").Router();

UserRouter.post("/registerUser", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
    const user = await UserModel({
      userName: req.body.userName,
      age: req.body.age,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      password: hashedPassword,
    }).save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

UserRouter.post("/loginUser", async (req, res) => {
  try {
    const user = await UserModel.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).send("Incorrect password");
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

UserRouter.post("/userSate", async (req, res) => {
  try {
    const _id = req.body._id;
    const newState = {
      mentalHealthRating: 10,
      physicalHealthRating: 10,
      mentalHealthFactors: "String",
      physicalHealthFactors: "String",
      stressFrequency: "String",
      sleepQuality: "String",
      previousAppsUsed: "String",
      motivationLevel: "String",
      wellnessActivities: "String",
      challenges: "String",
    };

    if (!newState) {
      return res.status(400).json({ error: "UserState data is required" });
    }
    UserModel.findByIdAndUpdate({ _id }, { $set: { [userSate]: newState } }).then(
      (v) => {
        res.send(v);
      }
    );
  } catch (error) {
    console.error("Error updating user state:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = UserRouter;
