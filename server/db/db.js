const mongoose = require("mongoose");

const connectToMongoDB = () => {
  mongoose
    .connect(
      "mongodb+srv://Dharam:Ds%4012345@homeautomation.axs1ij1.mongodb.net/HealthCare?retryWrites=true&w=majority&appName=HomeAutomation"
    )
    .then(() => {
      console.log("Connected to MongoDB.");
    })
    .catch((err) => console.log(err));
};

module.exports = connectToMongoDB;
