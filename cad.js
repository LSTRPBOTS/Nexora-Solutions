// ===============================
// LOAD SERVER SETTINGS
// ===============================
async function getSettings() {
    const res = await fetch("/serverSettings.json");
    return await res.json();
}

let settings = null;
let lastCallHash = null;

// Load settings once
getSettings().then(s => settings = s);

// ===============================
// MAIN LOOP — CHECK ERLC EVERY 2 SECONDS
// ===============================
setInterval(fetchERLCCalls, 2000);

async function fetchERLCCalls() {
    if (!settings) return;
    if (!settings.erlcApiKey) return;

    try {
        const res = await fetch("https://api.policeroleplay.community/v1/calls", {
            headers: {
                "Authorization": settings.erlcApiKey
            }
        });

        const data = await res.json();

        const callType = data.callType;
        const callDescription = data.callDescription;
        const callLocation = data.callLocation;

        if (!callType || !callDescription || !callLocation) return;

        const callHash = `${callType}-${callDescription}-${callLocation}`;

        if (callHash === lastCallHash) return;

        lastCallHash = callHash;

        const call = {
            id: "CALL-" + Math.floor(Math.random() * 999999),
            type: callType,
            description: callDescription,
            location: callLocation
        };

        speakCall(call);

    } catch (err) {
        console.error("ERLC Fetch Error:", err);
    }
}

// ===============================
// TTS ONLY — NO TONES
// ===============================
function speakCall(call) {
    const msg = new SpeechSynthesisUtterance(
        `${call.id}. ${call.type}. ${call.description}. ${call.location}.`
    );

    msg.rate = 1;
    msg.pitch = 0.9;
    msg.volume = 1;

    speechSynthesis.speak(msg);
}
