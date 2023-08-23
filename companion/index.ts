import { settingsStorage } from 'settings';
import { MessageModel } from '../app/util/message';
import * as messaging from 'messaging';

const serverDomain = 'www.acp-research.com';
const serverPort = '80';
const serverScheme = 'wss';

console.log('starting fitbit companion app');

// NOTE: front-end key names
const sendDataField = 'sendData';
const usernameField = 'username';

type SettingsModel = {
  [sendDataField]: boolean,
  [usernameField]: {
    name: string,
  }
}

const settings: SettingsModel = {
  [sendDataField]: false,
  [usernameField]: {
    name: '',
  },
};

// NOTE: setting default front-end values
settingsStorage.setItem(sendDataField, 'false');
settingsStorage.setItem(usernameField, '');

settingsStorage.addEventListener("change", (evt) => {
  // @ts-ignore
  for(const [key, value] of Object.entries(settings)) {
    if(evt.key == sendDataField) {
      if(evt.newValue == 'false') {
        settings[sendDataField] = false;
      } else {
        settings[sendDataField] = true;
      }
    } else if(evt.key == key) {
      if(!evt.newValue) {
        return;
      }

      settings[key] = JSON.parse(evt.newValue);
      break;
    }
  }
});

let webSocket: WebSocket;
function serverSocketConnect() {
  webSocket = new WebSocket(`${serverScheme}://${serverDomain}:${serverPort}/socket?userId=${settings[usernameField]}`);
  webSocket.addEventListener('open', (_event) => {
    console.log('server socket opened');
  });
  webSocket.addEventListener('message', (_event) => {
    console.log(`server socket message`);
  });
  webSocket.addEventListener('close', (_event) => {
    console.log('server web socket closed');
    
    setTimeout(function(_e) {
      console.log('attempting reconnection with server socket');
      if(webSocket.CLOSED) {
        serverSocketConnect();
      }
    }, 1000);
  });
  webSocket.addEventListener('error', (event) => {
    console.error(`server socket error: ${event}`);
  });
}


function peerSocketConnect() {
  messaging.peerSocket.addEventListener('open', (_event) => {
    console.log('peer socket opened');
  });
  messaging.peerSocket.addEventListener('message', (event) => {
    const message = event.data as MessageModel;

    console.log('received message from peer');

    if(!webSocket) {
      console.log('server web socket not intialized');
      return;
    }
    if(!webSocket.OPEN) {
      console.log('server web socket is not open');
      return;
    }
    if(!settings[usernameField].name) {
      console.error('username field not set');
      return;
    }
    if(!settings[sendDataField]) {
      console.log('ignoring peer data as send data is set to false');
      return;
    }

    webSocket.send(JSON.stringify({
      username: settings[usernameField],
      ...message,
    }));
  });
  messaging.peerSocket.addEventListener('close', (_event) => {
    console.log('peer socket closed');

    setTimeout(function(_e) {
      console.log('attempting reconnection with peer socket');

      if(messaging.peerSocket.CLOSED) {
        peerSocketConnect();
      }
    }, 1000);
  })
  messaging.peerSocket.addEventListener('error', (err) => {
    console.error(`peer socket error: ${err.code} - ${err.message}`);
  });
}

serverSocketConnect();
peerSocketConnect();
