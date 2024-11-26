import { Client, Storage } from 'node-appwrite';
// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint('https://67445ab24213a6ce118e.appwrite.global/')
    .setProject('674459e4001ac3695027')
    .setKey(req.headers['x-appwrite-key'] ?? '');

  const storage = new Storage(client);
//   const htmlFile = await storage.getFile(
//     '67446e2d0030235b1ba4',
//     '67446e590027a7ed5c65'
// );

  // The req object contains the request data
  if (req.path === "/ping") {
    // Use res object to respond with text(), json(), or binary()
    // Don't forget to return a response!
    return res.text("Pong");
  }
  return res.send(htmlFile, 200, {'content-type': 'text/html'});
};
