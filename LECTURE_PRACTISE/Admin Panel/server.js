const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [];

// Routes
const adminRoutes = require("./routes/adminRoutes")(posts);
app.use("/", adminRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
