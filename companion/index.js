import { inbox } from 'file-transfer';
import { settingsStorage } from 'settings';

// NOTE: front-end key names
const sendDataField = 'sendData';
const usernameField = 'username';


// NOTE: endpoint consts
const base_url = 'https://www.acp-research.com';
const dataStructureId = 'fitbit';

const settings = {
  [sendDataField]: false,
  [usernameField]: {
    name: '',
  },
};

const postDataCosmosDbContainer = (body) => {
  if(!settings[usernameField].name) {
    console.error('username not set');
    return;
  }

  const url = `${base_url}/api/push-data?dataStructureId=${dataStructureId}&userId=${settings[usernameField].name}`;

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
settingsStorage.setItem(usernameField, '');

settingsStorage.addEventListener("change", (evt) => {
  for(const [key, value] of Object.entries(settings)) {
    if(evt.key == sendDataField) {
      if(evt.newValue == 'false') {
        settings[sendDataField] = false;
      } else {
        settings[sendDataField] = true;
      }
    } else if(evt.key == key) {
      settings[key] = JSON.parse(evt.newValue);
      break;
    }
  }
});
