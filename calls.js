const fs = require("fs");
const express = require("express");
const router = express.Router();

router.get("/list", (req, res) => {
    const calls = JSON.parse(fs.readFileSync("./data/calls.json"));
    res.json(calls);
});

module.exports = router;
