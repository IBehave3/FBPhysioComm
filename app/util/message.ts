import * as messaging from "messaging";

export type MessageModel = {
  message_id: string;
  data: any;
};

export const sendMessage = (sendMessageModel: MessageModel) => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(sendMessageModel);
  } else {
    console.log('attempted to send message without open socket');
  }
};
