const fs = require("fs");
const path = require("path");

function generateRatings() {

    const inputPath = path.join(__dirname, "../data/ratings.txt");
    const outputPath = path.join(__dirname, "../data/ratings.json");

    const file = fs.readFileSync(inputPath, "utf8");
    const lines = file.trim().split("\n").slice(1);

    const ratings = {};

    for (const line of lines) {

        const parts = line.trim().split(/\s+/);

        const rating = Math.round(parseFloat(parts[0]));
        const id = parts[1];

        const contestSlug = parts[parts.length - 2];
        const problemIndex = parts[parts.length - 1];

        let contestType = null;
        let contestNumber = null;

        if (contestSlug.startsWith("weekly-contest-")) {
            contestType = "Weekly";
            contestNumber = parseInt(contestSlug.replace("weekly-contest-", ""));
        }
        else if (contestSlug.startsWith("biweekly-contest-")) {
            contestType = "Biweekly";
            contestNumber = parseInt(contestSlug.replace("biweekly-contest-", ""));
        }

        ratings[id] = {
            rating,
            contestType,
            contestNumber,
            question: parseInt(problemIndex.replace("Q", ""))
        };
    }

    fs.writeFileSync(outputPath, JSON.stringify(ratings, null, 2));

    console.log(`Generated ${Object.keys(ratings).length} ratings.`);
}

module.exports = generateRatings;

if (require.main === module) {
    generateRatings();
}