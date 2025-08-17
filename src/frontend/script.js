console.log("script.js loaded!");
fetch("http://localhost:1000/blogs", {
  headers: { "Authorization": `Bearer ${token}` }
})

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
// Fetch blogs
async function loadBlogs() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/blogs`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const blogs = await res.json();

  const container = document.getElementById("blogList");
  if (!container) return;
  container.innerHTML = blogs.map(b => `
    <div class="blog">
      <h2>${b.title}</h2>
      <p>${b.content}</p>
      <small>By ${b.author} | ${new Date(b.createdAtDate).toLocaleString()}</small>
      <br>
      <button onclick="viewBlog(${b.id})">View</button>
      <button onclick="editBlog(${b.id})">Edit</button>
      <button onclick="deleteBlog(${b.id})">Delete</button>
    </div>
  `).join("");
}

function viewBlog(id) { window.location.href = `blog.html?id=${id}`; }
function editBlog(id) { window.location.href = `edit.html?id=${id}`; }

async function deleteBlog(id) {
  const token = localStorage.getItem("token");
  await fetch(`${API_URL}/blogs/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  alert("Blog deleted!");
  loadBlogs();
}

loadBlogs();
