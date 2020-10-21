const mongoose = require("mongoose");
//const config = require("config");
//const URI = config.get("mongoUri");
const dbConnection = () => {
    try {
      mongoose.connect("mongodb://localhost:27017/eatsafe", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("Mongoose connected");
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = dbConnection;