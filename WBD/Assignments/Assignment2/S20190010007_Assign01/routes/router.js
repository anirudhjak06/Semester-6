const express = require("express");
const router = express.Router();

const projectRoute = require("./project.route");

router.use("/project", projectRoute);

module.exports = router