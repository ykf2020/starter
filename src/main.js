import { Client } from 'node-appwrite';
// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint('https://67445ab24213a6ce118e.appwrite.global/')
    .setProject('674459e4001ac3695027')
    .setKey(req.headers['x-appwrite-key'] ?? '');

  // The req object contains the request data
  if (req.path === "/ping") {
    // Use res object to respond with text(), json(), or binary()
    // Don't forget to return a response!
    return res.text("Pong");
  }
  const htmlLink = 'https://cloud.appwrite.io/v1/storage/buckets/67446e2d0030235b1ba4/files/67446e590027a7ed5c65/view?project=674459e4001ac3695027&project=674459e4001ac3695027&mode=admin'
  try {
    const response = await fetch(htmlLink);
    const htmlContent = await response.text();
    
    return res.send(htmlContent, 200, {'content-type': 'text/html'});
  } catch (err) {
    log(err);
    return res.json({ error: 'Failed to fetch HTML content' }, 500);
  }
};
