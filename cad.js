let lastCallId = null;

async function checkForCalls() {
    const res = await fetch("/api/calls/list");
    const data = await res.json();

    if (data.calls.length === 0) return;

    const latest = data.calls[data.calls.length - 1];

    if (!lastCallId) {
        lastCallId = latest.id;
        return;
    }

    if (latest.id !== lastCallId) {
        lastCallId = latest.id;
        speakCall(latest);
    }
}

setInterval(checkForCalls, 2000);

// ----------------------------
// TTS ONLY — NO TONES
// ----------------------------

function speakCall(call) {
    const msg = new SpeechSynthesisUtterance(
        `${call.id}. ${call.type}. ${call.description}. ${call.location}.`
    );

    msg.rate = 1;
    msg.pitch = 0.9;
    msg.volume = 1;

    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v =>
        v.name.toLowerCase().includes("male") ||
        v.name.toLowerCase().includes("microsoft") ||
        v.name.toLowerCase().includes("daniel")
    );

    if (voice) msg.voice = voice;

    speechSynthesis.speak(msg);
}
