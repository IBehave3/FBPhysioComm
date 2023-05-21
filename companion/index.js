import { inbox } from 'file-transfer';
import { settingsStorage } from 'settings';

// NOTE: front-end key names
const sendDataField = 'sendData';
const dbNameField = 'exampleDatabase';
const dbContainerNameField = 'exampleContainer';

const settings = {
  [sendDataField]: false,
  [dbContainerNameField]: 'exampleContainer',
  [dbNameField]: 'exampleDatabase',
};

const postDataCosmosDbContainer = (body) => {
  const url = `https://acp-research.com/api/post-container-inner?dbName=${settings[dbNameField]}&dbContainerName=${settings[dbContainerNameField]}`;

  console.log(`Attempting fetch at: ${url}`);

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body)
  }).then((res) => {
    console.log(`${url} Status: ${res.status}`)
  })
  .catch((e) => {
    console.error('Failed to make HTTP request!');
  });
};

const processAllFiles = async () => {
  let file;
  while((file = await inbox.pop())) {
    const payload = await file.json();
    if(settings[sendDataField]) {
      postDataCosmosDbContainer(payload);
    }
  }
};

inbox.addEventListener("newfile", processAllFiles);
processAllFiles();

// NOTE: setting default front-end values
settingsStorage.setItem(sendDataField, settings[sendDataField]);
settingsStorage.setItem(dbNameField, settings[dbNameField]);
settingsStorage.setItem(dbContainerNameField, settings[dbContainerNameField]);

settingsStorage.addEventListener("change", (evt) => {
  for(const [key, value] of Object.entries(settings)) {
    if(evt.key == sendDataField) {
      if(evt.newValue == 'false') {
        settings[sendDataField] = false;
      } else {
        settings[sendDataField] = true;
      }
    } else if(evt.key == key) {
      settings[key] = evt.newValue;
      break;
    }
  }
});
