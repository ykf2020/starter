import { Client, Storage } from 'node-appwrite';
// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  const projectId = '674459e4001ac3695027';
  const bucketId = '67446e2d0030235b1ba4';
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);

  const storage = new Storage(client);
  const getHtmlResult = await storage.listFiles(bucketId, [], '.html');

  if (req.path === '/ping') {
    return res.text('Pong');
  }

  try {
    const htmlFileId = getHtmlResult.files[0]['$id'];
    const htmlFileLink = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${htmlFileId}/view?project=${projectId}`;
    const response = await fetch(htmlFileLink);
    const htmlContent = await response.text();

    return res.send(
      `
      <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
    <script type="module" crossorigin src="/assets/index-Dxp5zAIY.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-n_ryQ3BS.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`,
      200,
      { 'content-type': 'text/html' }
    );
  } catch (err) {
    log(err);
    return res.json({ error: 'Failed to fetch HTML content' }, 500);
  }
};
