const fs = require("fs");
const express = require("express");
const router = express.Router();

router.post("/setApiKey", (req, res) => {
    const { serverName, apiKey, apiUrl } = req.body;

    const settings = JSON.parse(fs.readFileSync("./data/serverSettings.json"));

    if (!settings.servers[serverName]) {
        return res.json({ success: false, error: "Server not found" });
    }

    settings.servers[serverName].erlcApiKey = apiKey;
    settings.servers[serverName].erlcApiUrl = apiUrl;

    fs.writeFileSync("./data/serverSettings.json", JSON.stringify(settings, null, 2));

    res.json({ success: true });
});

module.exports = router;
