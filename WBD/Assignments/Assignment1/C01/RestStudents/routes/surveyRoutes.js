const { Router } = require("express");
const fs = require("fs");

const router = Router();

dataPath = "./data/db.json";

// Get collection
router.get("/", async (req, res) => {
  fs.readFile(dataPath, function (err, data) {
    if (err) {
      res.status(500).json({ message: err.message });
    }
    const surveys = JSON.parse(data);
    res.json(surveys);
  });
});

//Create individual
router.post("/", async (req, res) => {
  const newSurvey = {
    timestamp: new Date().toUTCString(),
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    educationProfile: req.body.educationProfile,
    address: req.body.address,
    alliances: req.body.alliances,
    allices: req.body.allices,
    securityconcerns: req.body.securityconcerns,
    overall: req.body.overall,
  };
  let surveys = require("../data/db.json");
  surveys.push(newSurvey);
  fs.writeFile(dataPath, JSON.stringify(surveys, null, 2), (err) => {
    if (err) res.status(400).json({ message: err.message });
    res.status(201).json(newSurvey);
  });
});

//Get individual
router.get("/:id", getStudent, (req, res) => {
  res.status(200).json(res.survey);
});

//update individual
router.patch("/:id", getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.survey.name = req.body.name;
  }
  if (req.body.gender != null) {
    res.survey.gender = req.body.gender;
  }
  if (req.body.age != null) {
    res.survey.age = req.body.age;
  }
  if (req.body.educationProfile != null) {
    res.survey.educationProfile = req.body.educationProfile;
  }
  if (req.body.address != null) {
    res.survey.address = req.body.address;
  }
  if (req.body.alliances != null) {
    res.survey.alliances = req.body.alliances;
  }
  if (req.body.allices != null) {
    res.survey.allices = req.body.allices;
  }
  if (req.body.securityconcerns != null) {
    res.survey.securityconcerns = req.body.securityconcerns;
  }
  if (req.body.overall != null) {
    res.survey.overall = req.body.overall;
  }
  res.timestamp = new Date().toUTCString();
  let surveys = require("../data/db.json");
  surveys.forEach((survey) =>
    survey.id === req.params.id ? req.survey : survey
  );
  fs.writeFile(dataPath, JSON.stringify(surveys, null, 2), (err) => {
    if (err) res.status(500).json({ message: err.message });
    res.status(200).json(res.survey);
  });
});

//delete individual
router.delete("/:id", getStudent, async (req, res) => {
  let surveys = require("../data/db.json");
  surveys = surveys.filter((survey) => survey.id !== res.survey.id);
  fs.writeFile(dataPath, JSON.stringify(surveys, null, 2), (err) => {
    if (err) res.status(500).json({ message: err.message });
    res.status(200).json({ message: "deleted succesfully" });
  });
});

async function getStudent(req, res, nxt) {
  let survey;
  try {
    let surveys = require("../data/db.json");
    survey = surveys.find((survey) => survey.id === req.params.id);
    if (survey == null) {
      return res.status(400).json({ message: "student does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.survey = survey;
  nxt();
}

module.exports = router;
