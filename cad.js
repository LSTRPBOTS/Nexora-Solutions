const BACKEND = "https://nexora-solutions-offical.nexora-systems.workers.dev";

document.getElementById("user").innerText = localStorage.getItem("username") || "Unknown";

let lastCallHash = null;

async function checkCalls() {
    const res = await fetch(`${BACKEND}/api/calls`);
    const data = await res.json();

    if (!data.calls || data.calls.length === 0) return;

    const latest = data.calls[data.calls.length - 1];

    const hash = `${latest.type}-${latest.description}-${latest.location}`;

    if (hash === lastCallHash) return;

    lastCallHash = hash;

    speakCall(latest);
}

setInterval(checkCalls, 2000);

function speakCall(call) {
    const msg = new SpeechSynthesisUtterance(
        `${call.id}. ${call.type}. ${call.description}. ${call.location}.`
    );

    msg.rate = 1;
    msg.pitch = 1;
    msg.volume = 1;

    speechSynthesis.speak(msg);
}
