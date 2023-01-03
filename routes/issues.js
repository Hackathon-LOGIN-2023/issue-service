const express = require("express");
const router = express.Router();
const Issue = require("../models/issue");
const fs = require("fs");

router.post("/", async (req, res) => {
  var image = req.files.image;
  // convert this image to base64cle
  console.log(image.data);

  // fs.writeFile("./O2.png", image.data, { encoding: "base64" }, function (err) {
  //   console.log("File created");
  // });
  res.send("Ok");
  // var imageAsBase64 = fs.readFileSync(image, "base64");
  //   var imagename = Date.now();
  //   try {
  //     var image = req.files.image;
  //     imagename =
  //       imagename + "." + image.name.split(".")[image.name.split(".").length - 1];
  //     image.mv("./images/" + imagename, function (error, result) {
  //       if (error) throw error;
  //     });
  //     var parsedData = JSON.parse(req.body.data);
  //     const news = new News({
  //       title: parsedData.title,
  //       content: parsedData.content,
  //       photos: "./images/" + imagename,
  //       date: parsedData.date,
  //       field: parsedData.field,
  //     });
  //     const savedNews = await news.save();
  //     res.send("News added successfully");
  //   } catch (err) {
  //     console.log("Error while adding news : " + err);
  //     res.status().send("Error while adding news : " + err);
  //   }
});

router.get("/", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

router.put("/:id", async (req, res) => {});

router.get("/:id", async (req, res) => {});

module.exports = router;
