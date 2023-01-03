var fs = require("fs");

var imageAsBase64 = fs.readFileSync("./OSptJs.png", "base64");

console.log(imageAsBase64);

// convert imageAsBase64 to image file
var base64Image = imageAsBase64.split(";base64,").pop();
fs.writeFile(
  "./OSptJs2.png",
  base64Image,
  { encoding: "base64" },
  function (err) {
    console.log("File created");
  }
);
