const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const router = require("./routes/router");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const { storage } = require("./middlewares/multer.middleware");
const morgan = require("morgan");
const { logs } = require("./middlewares/morgan.middleware");

// require("dotenv").config();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// require("./config/mongo.connection");

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(multer({ storage: storage }).single("teamLogo"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.set("views", path.join(__dirname, "templates/"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "images/")));
app.use(morgan("combined", { stream: logs }));

// Redirecting the use to the home route instead of /
app.get("/", (req, res, next) => {
  res.redirect("/wbd-middlewares/project");
});

app.use("/wbd-middlewares/", router);

// Redirects to home route if entered any invalid route
app.get("*", (req, res, next) => {
  res.redirect("/wbd-middlewares/project");
});

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
