import { inbox } from 'file-transfer';
import { settingsStorage } from 'settings';

// NOTE: front-end key names
const sendDataField = 'sendData';
const dbNameField = 'dbName';
const dbContainerNameField = 'dbContainerName';

const settings = {
  [sendDataField]: true,
  [dbContainerNameField]: 'exampleContainer',
  [dbNameField]: 'exampleDatabase',
};

const postDataCosmosDbContainer = (body) => {
  fetch(`http://localhost:7005/api/PostDataCosmosDbContainer?dbName=${settings[dbNameField]}&dbContainerName=${settings[dbContainerNameField]}`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((response) => {
    // console.log(`Server response status: ${response.status}`);
  }).catch((error) => console.error(error));
};

const processAllFiles = async () => {
  let file;
  while((file = await inbox.pop())) {
    const payload = await file.json();
    // console.log(`file contents: ${JSON.stringify(payload, null, 2)}`);
    if(settings[sendDataField]) {
      console.log('WAS TRUE');
      console.log(settings[sendDataField]);
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
