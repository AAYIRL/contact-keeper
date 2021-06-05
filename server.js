const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Init MiddleWare
app.use(express.json({ extended: false }));

//connect Database
connectDB();

//Define Routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is up and running...."));