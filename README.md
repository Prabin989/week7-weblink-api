# Weblinks API 🔗

A simple and efficient RESTful API created for managing a collection of weblinks. This project was built to satisfy the requirements for the Week 7 Weblinks API assignment, featuring full CRUD functionality and automated documentation.

## 🚀 What is this?
This is a Node.js/Express backend that allows you to store, view, update, and delete weblinks. It also includes special filtering to find links by their rating or if they are `.com` domains.

## ✨ Features
- **Full CRUD**: Create, Read, Update, and Delete weblinks.
- **Filtering**: Search for links by their star rating.
- **Domain Filter**: Quickly find all `.com` websites.
- **Auto-Documentation**: Uses `apidoc` to generate a beautiful web-based documentation.
- **Test Ready**: Includes a bash script for quick verification of all endpoints.

## 📦 How to Run

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Open your terminal inside the `weblinks-api` folder and run:
```bash
npm install
```

### 3. Start the Server
To run the server normally:
```bash
npm start
```
To run the server in **development mode** (auto-restarts when you save changes):
```bash
npm run dev
```

The server will be running at: `http://localhost:3000`

## 📖 How it Works

### API Documentation
Instead of reading the code, you can view the documentation in your browser while the server is running:
👉 **[http://localhost:3000/apidoc/index.html](http://localhost:3000/apidoc/index.html)**

If you make changes to the code comments and want to update the docs, run:
```bash
npm run doc
```

### Main Endpoints
- `GET /api/weblink` - View all links.
- `POST /api/weblink` - Add a new link.
- `GET /api/weblink/:id` - View a specific link.
- `PUT /api/weblink/:id` - Update an existing link.
- `DELETE /api/weblink/:id` - Delete a link.
- `GET /api/weblink/rating/:rating` - View links with a specific rating.
- `GET /api/weblink/filter/com` - View only `.com` links.

### Testing
To quickly verify that everything is working correctly, you can run the provided test script:
```bash
chmod +x test-api.sh
./test-api.sh
```

## 🛠️ Project Structure
- `index.js`: The main server file containing all the logic.
- `apidoc.json`: Configuration for the documentation generator.
- `public/apidoc/`: The folder where the documentation website lives.
- `test-api.sh`: A helper script to test the API endpoints.
