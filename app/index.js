import { HeartRateSensor } from 'heart-rate';
import { outbox } from 'file-transfer';
import * as fs from 'fs';

const sent_physio_state = {
  timestamp: -1,
  heartrate: [],
};

const lastHeartRateTS = -1;
const finalTimeStamp = -1;
if (HeartRateSensor) {
  const heartRateSensorConfig = {
    frequency: 1,
    sample: 60,
  };
  const hrm = new HeartRateSensor(heartRateSensorConfig);
  hrm.addEventListener("reading", () => {

    if(lastHeartRateTS != -1) {
      finalTimeStamp += hrm.timestamp - lastHeartRateTS; 
    } else {
      finalTimeStamp = Date.now();
    }

    lastHeartRateTS = hrm.timestamp; 

    const tsHeartRate = {
      ts:  finalTimeStamp,
      hr: hrm.heartRate, 
    }
    sent_physio_state.heartrate.push(tsHeartRate);
  });

  hrm.start();
} else {
  console.error("No HeartRateSensor");
}

setInterval(() => {
  sent_physio_state.timestamp = Date.now();
  fs.writeFileSync("test.txt",sent_physio_state, "json");
  outbox.enqueueFile("/private/data/test.txt")
    .then(ft => console.log(`Transfer of ${ft.name} successfully queued.`))
    .catch(err => console.error(`Failed to schedule transfer: ${err}`));

  sent_physio_state = {
    timestamp: -1,
    heartrate: [],
  };
}, 1000);
