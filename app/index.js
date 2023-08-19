// NOTE: import order is important here
import { outbox } from 'file-transfer';
import * as fs from 'fs';

import { physioState, resetPhysioState } from './physio';
import './sensor/heartRate';
import './sensor/accelerometer';
import './sensor/barometer';
import './sensor/bodyPresence';
import './sensor/gyroscope';
import './sensor/orientation';

setInterval(() => {
  physioState.timestamp = new Date(Date.now()).toISOString();
  fs.writeFileSync("test.txt", physioState, "json");
  outbox.enqueueFile("/private/data/test.txt")
    .then(ft => () => {})
    .catch(err => console.error(`Failed to schedule transfer: ${err}`));
  resetPhysioState();
}, 1000);
