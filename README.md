# Project

Project Description
This is a web application that allows users to browse, like, add, edit, and delete products. The application includes:

Home page - A page displaying the top 5 most-liked products.
Catalog - A page that shows all uploaded products with the option to view their details.
Product details - The creator of the product can edit or delete the product, while logged-in users can like or remove likes.
Search page - A page where products can be searched by title or description.
Add product - A page for adding new products (only for registered users).
Profile page - A page for users to change their username, email, or password, and view their uploaded products.
Login and Register pages - Pages for user login and registration.
Prerequisites
Node.js: You need to have Node.js installed (version 12 or above).
Angular: The client-side part requires Angular CLI.
Installation and Setup
Step 1: Install Dependencies
Run the following command to install all required dependencies for the project:

bash
Copy code
npm install
Step 2: Start the Server
Once the dependencies are installed, start the backend server with the command:

bash
Copy code
npm start
This will start the server (backend) and it will be available at http://localhost:5000 (by default).

Step 3: Start the Client
To start the client-side application, run the following command:

bash
Copy code
ng serve
Once this command is executed, the client application will be available at http://localhost:4200.

Main Features
1. Home Page
The home page loads the top 5 most liked products.
2. Catalog
All uploaded products are displayed with an option to view their details.
3. Product Details
The creator of the product can edit or delete the product.
Logged-in users can like or remove likes on products.
4. Search Page
Users can search for products by title or description.
5. Add Product
Registered users can add new products.
6. Profile Page
Users can change their username, email, or password.
Uploaded products from the user are displayed.
7. Login and Register Pages
Users can log in or register for the application.
Project Structure
bash
Copy code
- src/
  - app/
    - components/           # Application components
    - services/              # Services for communication with the server (API)
    - directives/            # Custom directives
    - pipes/                 # Custom pipes
    - models/                # Data models for the Angular side
- server/                    # Backend (Node.js)
  - controllers/             # Controllers for handling requests
  - models/                  # Data models for the backend
  - routes/                  # Routes for different API requests
  - utils/                   # Utility functions
Dependencies
Client-Side
Angular: The main framework for building the web application.
RxJS: A library for reactive programming with observable streams.
Moment.js: For working with dates and times.
Server-Side
Express: A web framework for Node.js.
MongoDB: The database for storing user and product data.
JWT (JSON Web Token): For authentication and authorization of users.
