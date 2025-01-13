const mongoose = require("mongoose");

const CreatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Creator", CreatorSchema);
