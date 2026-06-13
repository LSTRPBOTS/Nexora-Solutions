const BACKEND = "https://nexora-solutions-offical.nexora-systems.workers.dev";

document.getElementById("registerBtn").onclick = async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Enter username and password.");
        return;
    }

    const res = await fetch(`${BACKEND}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
        alert("Account created!");
        window.location.href = "index.html";
    } else {
        alert("Username already exists");
    }
};
