const express = require("express");
const { csurfMiddleware } = require("../middlewares/csrf.middleware");
const router = express.Router();
const Project = require("../models/Project.model");

router.route("/").get((req, res, next) => {
  res.render("home", { csrfToken: req.csrfToken() });
});

router.route("/submit-form").post(async (req, res, next) => {
  console.log(req.body);
  const project = new Project({
    title: req.body.projectTitle,
    technologies_used: req.body.technologiesUsed,
    team_size: req.body.teamSize,
    team_logo: req.file?.filename || "",
  });
  try {
    const myProject = await project.save();
    return res.render("submitted", myProject);
    console.log(myProject);
  } catch (error) {
    return res.status(500).render("errors", { error });
  }
});

module.exports = router;
