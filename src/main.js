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
  const getJSResult = await storage.listFiles(bucketId, [], 'index.js');
  const getCSSResult = await storage.listFiles(bucketId, [], 'styles.css');

  if (req.path === '/ping') {
    return res.text('Pong');
  }

  try {
    const jsFileId = getJSResult.files[0]['$id'];
    const jsFileLink = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${jsFileId}/view?project=${projectId}`;
    const jsResponse = await fetch(jsFileLink);
    const jsContent = await jsResponse.text();
    console.log('jsFileLink', jsFileLink)
    const cssFileId = getCSSResult.files[0]['$id'];
    const cssFileLink = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${cssFileId}/view?project=${projectId}`;
    const cssResponse = await fetch(cssFileLink);
    const cssContent = await cssResponse.text();
    console.log('cssFileLink', cssFileLink)
    
    
   
    return res.send(
      `
      <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
    <script type="module">${jsContent}</script>
    <style>${cssContent}</style>
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
