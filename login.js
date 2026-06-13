const BACKEND = "https://nexora-solutions-offical.nexora-systems.workers.dev";

document.getElementById("loginBtn").onclick = async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Empty fields
    if (!username || !password) {
        alert("Please enter both a username and password.");
        return;
    }

    // Send login request
    const res = await fetch(`${BACKEND}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    // If login is correct
    if (data.success) {
        localStorage.setItem("username", username);
        window.location.href = "servers.html";
        return;
    }

    // If login is invalid
    alert("Login not found. Redirecting to registration...");
    setTimeout(() => {
        window.location.href = "register.html";
    }, 1000);
};
