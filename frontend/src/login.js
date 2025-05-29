async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (res.ok) {
    localStorage.setItem("token", (await res.json()).token);
    window.location = "landing.html";
  } else {
    alert("Login failed");
  }
}
