document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const postContainer = document.getElementById('post-container');
    const createForm = document.getElementById('create-form');
    const editForm = document.getElementById('edit-form');

    const token = localStorage.getItem('token');

    // Blog list page
    if (postsContainer) {
        if (!token) {
            // window.location.href = 'login.html';
            // return;
        }

        fetch('/blogs', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                // window.location.href = 'login.html';
            }
            return res.json();
        })
        .then(posts => {
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h2><a href="blog.html?id=${post.id}">${post.title}</a></h2>
                    <p>${post.content.substring(0, 100)}...</p>
                    <p><em>by ${post.author}</em></p>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    // Single blog page
    if (postContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (id) {
            fetch(`/blogs/${id}`)
            .then(res => res.json())
            .then(post => {
                postContainer.innerHTML = `
                    <h1>${post.title}</h1>
                    <p><em>by ${post.author}</em></p>
                    <div>${post.content}</div>
                    <a href="edit.html?id=${post.id}">Edit</a>
                    <button id="delete-btn" data-id="${post.id}">Delete</button>
                `;

                const deleteBtn = document.getElementById('delete-btn');
                deleteBtn.addEventListener('click', () => {
                    if (confirm('Are you sure you want to delete this post?')) {
                        fetch(`/blogs/${id}`, {
                            method: 'DELETE',
                            headers: { 'Authorization': `Bearer ${token}` }
                        })
                        .then(res => {
                            if (res.ok) {
                                window.location.href = 'index.html';
                            } else {
                                alert('Failed to delete post.');
                            }
                        })
                        .catch(error => console.error('Error:', error));
                    }
                });
            })
            .catch(error => console.error('Error:', error));
        }
    }

    // Create post page
    if (createForm) {
        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = createForm.title.value;
            const content = createForm.content.value;

            fetch('/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            })
            .then(res => {
                if (res.ok) {
                    window.location.href = 'index.html';
                } else {
                    alert('Failed to create post.');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Edit post page
    if (editForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        // Fetch post data and populate form
        if (id) {
            fetch(`/blogs/${id}`)
            .then(res => res.json())
            .then(post => {
                editForm.id.value = post.id;
                editForm.title.value = post.title;
                editForm.content.value = post.content;
            })
            .catch(error => console.error('Error:', error));
        }

        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = editForm.title.value;
            const content = editForm.content.value;
            const postId = editForm.id.value;

            fetch(`/blogs/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            })
            .then(res => {
                if (res.ok) {
                    window.location.href = `blog.html?id=${postId}`;
                } else {
                    alert('Failed to update post.');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
