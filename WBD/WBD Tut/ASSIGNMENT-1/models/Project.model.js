const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  technologies_used: {
    type: String,
    required: true,
  },
  team_size: {
    type: Number,
    required: true,
  },
  team_logo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("project", ProjectSchema);
