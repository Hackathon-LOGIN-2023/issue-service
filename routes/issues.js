const express = require("express");
const router = express.Router();
const Issue = require("../models/issue");

// get all issues by category
router.get("/category/:cat", async (req, res) => {
  try {
    const category = req.params.cat;
    console.log(category);
    const issue = await Issue.find({
      category: category,
    });
    res.status(200).json(issue);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const issue = await Issue.find({ _userId: id });
    res.status(200).json(issue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let parsedIssue = JSON.parse(req.body.data);
    const newIssue = new Issue({
      title: parsedIssue.title,
      description: parsedIssue.description,
      date: parsedIssue.date,
      // image: req.files.image.data.toString("base64"),
      image: parsedIssue.image,
      location: parsedIssue.location,
      status: parsedIssue.status,
      userId: parsedIssue.userId,
      severity: parsedIssue.severity,
      category: parsedIssue.category,
      // votes: {
      //   userId: parsedIssue.votes.userId,
      //   value: parsedIssue.votes.value,
      // },
      votes: [],
      updates: [],
    });
    const savedIssue = await newIssue.save();
    res.send(savedIssue);
  } catch (error) {
    console.log("Error while adding the issue : " + error);
    res.status().send("Error while adding the issue : " + error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    console.log("third");
    const id = req.params.id;
    const issue = await Issue.findOne({ _id: id });
    res.status(200).json(issue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/:id/updates", async (req, res) => {
  try {
    const id = req.params.id;
    const image = req.body.image;
    const description = req.body.description;
    const severity = req.body.severity;
    const category = req.body.category;
    const issue = await Issue.findOne({ _id: id });
    const updates = issue.updates;
    const index = updates.findIndex((update) => update.userId == userId);
    const update = { image, description, severity, category };
    if (index === -1) {
      updates.push(update);
    } else {
      updates[index] = update;
    }
    const updatedIssue = await Issue.updateOne(
      { _id: id },
      { $set: { updates } }
    );
    res.status(200).json(updatedIssue);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});
router.get("/", async (req, res) => {
  try {
    console.log("all");
    res.status(200).json(await Issue.find({}));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      const userId = decodedToken.id;
      if ( req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        const issue =  Issue.deleteOne({ _id: id });
        res.status(200).json(issue);
      }
      
    });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // if (req.files) {
    //   newIssue.image = req.files.image.data.toString("base64");
    // }
    const issue = await Issue.updateOne(
      { _id: id },
      { $set: JSON.parse(req.body.data) }
    );
    res.status(200).json(issue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/vote", async (req, res) => {
  try {
    const id = req.body.id;
    const userId = req.body.userId;
    // value equals 1 if the value is supperior to 1 and -1 if the value is inferior to 1
    const value = req.body.value > 0 ? 1 : -1;
    const issue = await Issue.findOne({ _id: id });
    const votes = issue.votes;
    const index = votes.findIndex((vote) => vote.userId == userId);
    if (index === -1) {
      votes.push({ userId, value });
    } else {
      votes[index].value = value;
    }
    const updatedIssue = await Issue.updateOne(
      { _id: id },
      { $set: { votes } }
    );
    res.status(200).json(updatedIssue);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
