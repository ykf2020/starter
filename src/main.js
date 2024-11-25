const express = require('express');
const { Client, Users } = require('node-appwrite');
const app = express();

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
  .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID);
const users = new Users(client);

// Middleware to set Appwrite key from headers
app.use((req, res, next) => {
  client.setKey(req.headers['x-appwrite-key'] ?? '');
  next();
});

// Route to list users
app.get('/users', async (req, res) => {
  try {
    const response = await users.list();
    console.log(`Total users: ${response.total}`);
    res.json(response);
  } catch (err) {
    console.error("Could not list users: " + err.message);
    res.status(500).json({ error: "Could not list users" });
  }
});

// Ping route
app.get('/ping', (req, res) => {
  res.send('Pong');
});

// Default route
app.get('/', (req, res) => {
  res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});