const express = require("express");
const router = express.Router();
const Issue = require("../models/issue");
const fs = require("fs");

router.post("/", async (req, res) => {
  try {
    let parsedIssue = JSON.parse(req.body.data);
    const newIssue = new Issue({
      title: parsedIssue.title,
      description: parsedIssue.description,
      date: parsedIssue.date,
      photo: req.files.image.data.toString("base64"),
      location: parsedIssue.location,
      status: parsedIssue.status,
      userId: parsedIssue.userId,
      severity: parsedIssue.severity,
      category: parsedIssue.category,
      votes: {
        userId: parsedIssue.votes.userId,
        value: parsedIssue.votes.value,
      },
    });

    const savedIssue = await newIssue.save();
    res.send(savedIssue);
  } catch (error) {
    console.log("Error while adding the issue : " + error);
    res.status().send("Error while adding the issue : " + error);
  }
});

router.get("/", async (req, res) => {});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const issue = await Issue.deleteOne({ _id: id });
    res.status(200).json(issue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const issue = await Issue.findOne({ _id: id });
    res.status(200).json(issue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
