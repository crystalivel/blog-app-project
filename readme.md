# Blog App Project

A simple RESTful Blog API built with Node.js and Express, featuring user authentication (JWT), password hashing (bcrypt), and JSON file storage. This project provides basic blog management with create, read, update, and delete (CRUD) operations, secured by authentication.

 ## Features

### User Authentication

Register new users with userName and password.

Login with credentials to receive a JWT token.

Passwords are securely hashed using bcrypt.

### Blog Management

Create a blog post (title, author, content, createdAtDate, updatedAtDate).

Read all blogs or a single blog by ID.

Update a blog post (updates updatedAtDate automatically).

Delete a blog post.

### All blog routes are protected with JWT authentication.

### File-Based Storage

User and blog data are stored in JSON files (users.json and data.json).

No database required perfect for learning and small projects.

### Technologies Used

`Node`.js => runtime environment

`Express` => web framework

`bcryptjs` => password hashing

`jsonwebtoken` (JWT) => token-based authentication

`fs` => file system for JSON storage

`CORS` => Cross-Origin Resource Sharing support
