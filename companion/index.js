import { inbox } from 'file-transfer';
import { settingsStorage } from 'settings';

// NOTE: front-end key names
const sendDataField = 'sendData';
const dbNameField = 'exampleDatabase';
const dbContainerNameField = 'exampleContainer';

const settings = {
  [sendDataField]: true,
  [dbContainerNameField]: 'exampleContainer',
  [dbNameField]: 'exampleDatabase',
};

const postDataCosmosDbContainer = (body) => {
  const url = 'https://theassembler1functionapp.azurewebsites.net/api/HttpExample?';

  fetch(url, {method: "GET", mode: 'cors'}).then( (res) => {
    return `Code: ${res.status} ${res.statusText}`
  }).then(txt => {
    // This is sending the message back to the watch. You can omit for testing.
    console.log(txt);
  }).catch( e => {
    console.log(e);
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
