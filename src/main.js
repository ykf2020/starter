// import { Client, Users } from 'node-appwrite';

// index.js
const express = require('express');
const cors = require('cors');

// Init express app
const app = express();

// Enable CORS
app.use(cors());

// Main route to serve HTML
app.get('/', (req, res) => {
    // Set content type to HTML
    res.setHeader('Content-Type', 'text/html');
    
    // Send the HTML content
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Appwrite Web Page</title>
            <style>
                /* CSS styles */
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f0f2f5;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #2563eb;
                }
                #content {
                    margin-top: 20px;
                }
                button {
                    background-color: #2563eb;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #1d4ed8;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Appwrite</h1>
                <div id="content">
                    <p>This page is served from an Appwrite Cloud Function!</p>
                    <button onclick="updateContent()">Click Me!</button>
                </div>
            </div>

            <script>
                // JavaScript functionality
                function updateContent() {
                    const content = document.getElementById('content');
                    const timestamp = new Date().toLocaleTimeString();
                    content.innerHTML += \`<p>Button clicked at \${timestamp}</p>\`;
                }
            </script>
        </body>
        </html>
    `);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Export the express app
module.exports = app;
