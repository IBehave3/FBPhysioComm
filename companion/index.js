import { inbox } from 'file-transfer';

const postDataCosmosDbContainer = (dbName, dbContainerName, body) => {
  fetch(`http://localhost:7005/api/PostDataCosmosDbContainer?dbName=exampleDatabase&dbContainerName=exampleContainer`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((response) => {
    console.log(`Server response status: ${response.status}`);
  }).catch((error) => console.error(error));
};

const processAllFiles = async () => {
  let file;
  while((file = await inbox.pop())) {
    const payload = await file.json();
    console.log(`file contents: ${JSON.stringify(payload, null, 2)}`);
  }
};

inbox.addEventListener("newfile", processAllFiles);

processAllFiles();
