const https = require("https");
const fs = require("fs");
const path = require("path");

const generateRatings = require("./generateRatings");

const url =
    "https://raw.githubusercontent.com/zerotrac/leetcode_problem_rating/main/ratings.txt";

const outputPath =
    path.join(__dirname, "../data/ratings.txt");

console.log("Downloading latest ratings...");

https.get(url, (response) => {

    const file = fs.createWriteStream(outputPath);

    response.pipe(file);

    file.on("finish", () => {

        file.close();

        console.log("Download complete.");

        generateRatings();

        console.log("Done.");
    });

}).on("error", (err) => {

    console.error(err);

});