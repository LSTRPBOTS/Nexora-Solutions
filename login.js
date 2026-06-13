const BACKEND = "https://nexora-solutions-offical.nexora-systems.workers.dev";

document.getElementById("loginBtn").onclick = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${BACKEND}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
        localStorage.setItem("username", username);
        window.location.href = "cad.html";
    } else {
        alert("Invalid login");
    }
};
