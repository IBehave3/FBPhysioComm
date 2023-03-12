import { outbox } from 'file-transfer';
import { physioState, resetPhysioState } from './physio';
import * as fs from 'fs';
import './heartRate';

setInterval(() => {
  physioState.timestamp = Date.now();
  fs.writeFileSync("test.txt", physioState, "json");
  outbox.enqueueFile("/private/data/test.txt")
    .then(ft => console.log(`Transfer of ${ft.name} successfully queued.`))
    .catch(err => console.error(`Failed to schedule transfer: ${err}`));
  resetPhysioState();
}, 1000);
