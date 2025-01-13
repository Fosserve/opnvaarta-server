const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// Get all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error });
  }
});

// Get article by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error fetching article", error });
  }
});

// Add a comment to an article
router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.comments.push({ content });
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
});

// Create a new article
router.post("/", async (req, res) => {
  const { title, content, category, topics } = req.body;

  try {
    const newArticle = new Article({
      title,
      content,
      category,
      topics,
    });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: "Error creating article", error });
  }
});

// Update an article
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, category, topics } = req.body;

  try {
    const article = await Article.findByIdAndUpdate(id, {
      title,
      content,
      category,
      topics,
    }, { new: true });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error updating article", error });
  }
});

// Delete an article
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting article", error });
  }
});

module.exports = router;
