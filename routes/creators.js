const express = require("express");
const router = express.Router();
const Creator = require("../models/Creator"); // Import the Creator model

// Get all creators
router.get("/", async (req, res) => {
  try {
    const creators = await Creator.find();
    res.json(creators);
  } catch (error) {
    res.status(500).json({ message: "Error fetching creators", error });
  }
});

// Get creator by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const creator = await Creator.findById(id);
    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }
    res.json(creator);
  } catch (error) {
    res.status(500).json({ message: "Error fetching creator", error });
  }
});

// Create a new creator
router.post("/", async (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res.status(400).json({ error: "Name and bio are required" });
  }
  try {
    const newCreator = new Creator({ name, bio });
    await newCreator.save();
    res.status(201).json(newCreator);
  } catch (error) {
    res.status(500).json({ message: "Error creating creator", error });
  }
});

// Update a creator
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  try {
    const updatedCreator = await Creator.findByIdAndUpdate(id, { name, bio }, { new: true });
    if (!updatedCreator) {
      return res.status(404).json({ message: "Creator not found" });
    }
    res.json(updatedCreator);
  } catch (error) {
    res.status(500).json({ message: "Error updating creator", error });
  }
});

// Delete a creator
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCreator = await Creator.findByIdAndDelete(id);
    if (!deletedCreator) {
      return res.status(404).json({ message: "Creator not found" });
    }
    res.json({ message: "Creator deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting creator", error });
  }
});

module.exports = router;
