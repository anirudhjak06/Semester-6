//Using Express Router
const { Router } = require("express");
const fs = require("fs");

const router = Router();

//DATABASE JSON FILE 
dataPath = "./data/db.json";

//GET the collection
router.get("/", async (req, res) => {
  //Writing it to the JSON file
  fs.readFile(dataPath, function (err, data) {
    if (err) {
      //Error Messages
      res.status(500).json({ message: err.message });
    }
    const climate = JSON.parse(data);
    //Sending the response to the server
    res.json(climate);
  });
});

//CREATE individual
router.post("/", async (req, res) => {
  //Creating a new Climate Survey
  const climateSurvey = {
    timestamp: new Date().toUTCString(),
    id:req.body.id,
    age: req.body.age,
    education: req.body.education,
    country: req.body.country,
    issue: req.body.issue,
    imp: req.body.imp,
    cause: req.body.cause,
    impact: req.body.impact,
    tackle: req.body.tackle,
    action: req.body.action,
  };
  //Giving the survey DB file
  let climate = require("../data/db.json");
  //Pushing the data to the file
  climate.push(climateSurvey);
  //Writing it to the JSON file
  fs.writeFile(dataPath, JSON.stringify(climate, null, 2), (err) => {
    //Error Messages
    if (err) res.status(400).json({ message: err.message });
    res.status(201).json(climateSurvey);
  });
});

//GET individual
router.get("/:id", getStudent, (req, res) => {
  //Sending the response to the server
  res.status(200).json(res.survey);
});

//UPDATE individual
router.patch("/:id", getStudent, async (req, res) => {
  if (req.body.age != null) {
    res.survey.age = req.body.age;
  }
  if (req.body.education != null) {
    res.survey.education = req.body.education;
  }
  if (req.body.country != null) {
    res.survey.country = req.body.country;
  }
  if (req.body.issue != null) {
    res.survey.issue = req.body.issue;
  }
  if (req.body.imp != null) {
    res.survey.imp = req.body.imp;
  }
  if (req.body.cause != null) {
    res.survey.cause = req.body.cause;
  }
  if (req.body.impact != null) {
    res.survey.impact = req.body.impact;
  }
  if (req.body.tackle != null) {
    res.survey.tackle = req.body.tackle;
  }
  if (req.body.action != null) {
    res.survey.action = req.body.action;
  }
  res.timestamp = new Date().toUTCString();
  //Giving the survey DB file
  let climate = require("../data/db.json");
  //Pushing the data to the file
  climate.forEach((survey) =>
    survey.id === req.params.id ? req.survey : survey
  );
  //Writing it to the JSON file
  fs.writeFile(dataPath, JSON.stringify(climate, null, 2), (err) => {
    if (err) res.status(500).json({ message: err.message });
    //Sending the response to the server
    res.status(200).json(res.survey);
  });
});

//DELETE individual
router.delete("/:id", getStudent, async (req, res) => {
  let climate = require("../data/db.json");
  climate = climate.filter((survey) => survey.id !== res.survey.id);
  //Writing it to the JSON file
  fs.writeFile(dataPath, JSON.stringify(climate, null, 2), (err) => {
    //Error Messages
    if (err) res.status(500).json({ message: err.message });
    res.status(200).json({ message: "deleted succesfully" });
  });
});

async function getStudent(req, res, nxt) {
  let survey;
  try {
    let climate = require("../data/db.json");
    survey = climate.find((survey) => survey.id === req.params.id);
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
