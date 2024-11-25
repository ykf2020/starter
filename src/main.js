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

  return res.send(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>My Appwrite App</title>
        <style>
          /* Your CSS styles here */
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            margin: 10px 0;
          }
          a {
            color: #f02e65;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>${'ya'}</h1>
        <ul>
          <li><a href="${'https://appwrite.io/docs'}">Learn More</a></li>
          <li><a href="${'https://appwrite.io/docs'}">Join Discord</a></li>
          <li><a href="${'https://appwrite.io/docs'}">Get Inspired</a></li>
        </ul>

        <script>
          // Your JavaScript code here
          document.addEventListener('DOMContentLoaded', () => {
            console.log('Page loaded!');
            
            // Example: Add click events to links
            document.querySelectorAll('a').forEach(link => {
              link.addEventListener('click', (e) => {
                console.log('Clicked:', e.target.href);
              });
            });
          });
        </script>
      </body>
    </html>`,
    200,
    {'content-type': 'text/html'}
  );
};
