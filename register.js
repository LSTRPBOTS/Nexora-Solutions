const BACKEND = "https://nexora-solutions-offical.nexora-systems.workers.dev";

document.getElementById("registerBtn").onclick = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${BACKEND}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
        alert("Account created!");
        window.location.href = "login.html";
    } else {
        alert("Username already exists");
    }
};
