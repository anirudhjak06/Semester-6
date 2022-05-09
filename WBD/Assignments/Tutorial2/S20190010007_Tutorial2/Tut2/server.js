const fs = require("fs");
const path = require("path");
const http = require("http");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const rfs = require("rotating-file-stream");

let app = express();

let accessLogStream = rfs.createStream("access.log", {
  interval: "1h",
  path: __dirname
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/css", express.static(path.join(__dirname, "/static/css")));
app.use("/images", express.static(path.join(__dirname, "/static/images")));
app.use(morgan("combined", { stream: accessLogStream }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/groups", (req, res) => {
  let groups = require("./db.json");
  res.render("surveys", { surveys: groups });
});

app.post("/", (req, res) => {
  const { group, topic } = req.body;
  let members = [];
  for (let i = 1; i <= 4; i++) {
    let stud = {};
    stud.name = req.body["member" + i.toString()];
    stud.roll = req.body["roll" + i.toString()];
    members.push(stud);
  }
  const newGroup = {
    group: group,
    topic: topic,
    members: members,
  };
  let groups = require("./db.json");
  groups.push(newGroup);
  fs.writeFile("db.json", JSON.stringify(groups, null, 4), (err) => {
    if (err) res.status(400);
    res.redirect("/groups");
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
