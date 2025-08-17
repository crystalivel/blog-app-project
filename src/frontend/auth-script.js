document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userName = document.getElementById("regUser").value;
  const password = document.getElementById("regPass").value;

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password }),
  });

  const data = await res.json();
  alert(data.message);
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userName = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password }),
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    alert("Login successful!");
    window.location.href = "blogs.html"; 
  } else {
    alert(data.message);
  }
});

