const express = require('express');
const app = express();
const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/eatsafe";
const PORT = process.env.PORT || 5000;
const connectDb = require('./config/db')

connectDb()

app.use (express.json({ extended: false }));

app.use("/api/register", require("./routes/register"));
app.use("/api/client", require('./routes/formClient'));

app.get("/", (req, res) => {
    res.send("OKAY BOBBY");
  });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });