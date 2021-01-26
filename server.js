const express = require("express");
const app = express();
// const cors = require("cors")
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const PORT = 3000;

// app.use(cors);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.send({ message: "success" });
});

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Port is listening at ${PORT}`);
});
