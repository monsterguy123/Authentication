                                                                                Social Media Backend Application
This backend service provides various functionalities for a social media platform, including Authentication, Authorization, Post management (creation, deletion, updating, retrieval), Comment management (creation, deletion, retrieval), and Like functionality.

Features
Authentication and Authorization:

Utilizes bcrypt for password hashing during signup.
Generates JWT tokens for user authentication during signin.
Only users with valid authorization tokens can perform actions like creating, deleting, or updating posts, comments, and likes.
Post Management:

Users can create, delete, update, and retrieve posts.
Comment Management:

Users can create, delete, and retrieve comments on posts.
Like Functionality:

Users can like or unlike posts.
Database
The backend uses a NoSQL database, MongoDB, and is hosted on Render's free hosting service.

Endpoints
Authentication
POST api/v1/signup: Allows users to register by providing necessary details. Passwords are hashed using bcrypt before being stored in the database.
POST api/v1/signin: Validates user credentials and generates a JWT token for authorization.
Post Management
POST api/v1/post/createpost: Creates a new post.
GET api/v1/post/getallpost: Retrieves all posts.
PUT api/v1/post/updatepost/:postid: Updates a specific post by its ID.
DELETE api/v1/post/deletepost/:postid: Deletes a specific post by its ID.
Comment Management
POST api/v1/post/:postId/comments: Adds a comment to a specific post.
GET api/v1/post/:postId/comments: Retrieves all comments for a specific post.
DELETE api/v1/post/:postId/:commentId: Deletes a specific comment on a post.
Like Functionality
POST api/v1/post/:postId/like: Likes a specific post.
DELETE api/v1/post/:postId/unlike: Removes the like from a specific post.
GET api/v1/post/:postId/getalllikes: get all likes 
