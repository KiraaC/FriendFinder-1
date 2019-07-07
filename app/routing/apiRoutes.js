var path = require("path");
var houses = require("./../data/houses.js");

module.exports = function(app) {
    app.get("/api/houses", (req, res) => {
        res.json(houses);
    });

    app.post("/api/houses", (req, res) => {
        var userData = req.body;
        var userResponses = userData.scores;

        var name ="";
        var totalDifference =10000;

        for (var i = 0; i < houses.length; i++) {
            var diff = 0;
            for (var j = 0; j < userResponses.length; j++){
                diff += Math.abs(houses[i].scores[j] - userResponses[j]);
            }
            if (diff < totalDifference) {
                totalDifference =  diff;
                name = houses[i].name;
            }
        }
        houses.push(userData);
        res.json({status: "ok", name: name});
    });
};