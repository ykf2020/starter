import fs from 'fs/promises';
import path from 'path';
import { Client, Users } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const users = new Users(client);

  try {
    const response = await users.list();
    // Log messages and errors to the Appwrite Console
    // These logs won't be seen by your end users
    log(`Total users: ${response.total}`);
  } catch(err) {
    error("Could not list users: " + err.message);
  }

  // The req object contains the request data
  if (req.path === "/ping") {
    // Use res object to respond with text(), json(), or binary()
    // Don't forget to return a response!
    return res.text("Pong");
  }

  try {
    // Read the files
    const htmlTemplate = await fs.readFile(path.join(process.cwd(), 'assets', 'index.html'), 'utf8');
    const css = await fs.readFile(path.join(process.cwd(), 'assets', 'styles.css'), 'utf8');
    const js = await fs.readFile(path.join(process.cwd(), 'assets', 'script.js'), 'utf8');

    // Define your variables
    const templateVars = {
      title: 'Welcome to Appwrite',
      docsUrl: 'https://appwrite.io/docs',
      discordUrl: 'https://appwrite.io/discord',
      inspireUrl: 'https://appwrite.io/docs'
    };

    // Replace template variables
    let html = htmlTemplate;
    Object.entries(templateVars).forEach(([key, value]) => {
      html = html.replace(`\${${key}}`, value);
    });

    // Insert CSS and JS
    html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`);
    html = html.replace('<script src="script.js"></script>', `<script>${js}</script>`);

    return res.send(html, 200, {'content-type': 'text/html'});
  } catch (err) {
    console.error("Error reading files: " + err.message);
    return res.text("Internal Server Error", 500);
  }
};
