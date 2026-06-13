const fs = require("fs");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.post("/fetchCalls", async (req, res) => {
    const { serverName } = req.body;

    const settings = JSON.parse(fs.readFileSync("./data/serverSettings.json"));

    if (!settings.servers[serverName]) {
        return res.json({ success: false, error: "Server not found" });
    }

    const apiKey = settings.servers[serverName].erlcApiKey;
    const apiUrl = settings.servers[serverName].erlcApiUrl;

    if (!apiKey || !apiUrl) {
        return res.json({ success: false, error: "API key or URL missing" });
    }

    const response = await fetch(apiUrl, {
        headers: {
            "Authorization": apiKey
        }
    });

    const erlcData = await response.json();

    const calls = JSON.parse(fs.readFileSync("./data/calls.json"));

    const newCall = {
        id: "CALL-" + Math.floor(Math.random() * 999999),
        type: erlcData.callType,
        description: erlcData.callDescription,
        location: erlcData.callLocation,
        timestamp: Date.now()
    };

    calls.calls.push(newCall);

    fs.writeFileSync("./data/calls.json", JSON.stringify(calls, null, 2));

    res.json({ success: true, call: newCall });
});

module.exports = router;
