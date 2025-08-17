const token = localStorage.getItem("token");

if (!token) {
  alert("You are not logged in!");
  window.location.href = "index.html"; // redirect back to login
}
fetch("http://localhost:1000/blogs", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => {
    console.log(data);
    // Example: render blogs
    const container = document.getElementById("blogs-container");
    container.innerHTML = data.map(b => `<h2>${b.title}</h2><p>${b.content}</p>`).join("");
  })
  .catch(err => console.error(err));
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