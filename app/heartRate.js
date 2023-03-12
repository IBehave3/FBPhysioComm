import { HeartRateSensor } from 'heart-rate';
import { HEART_RATE } from './config'
import { physioState } from './physio';

const lastHeartRateTS = -1;
const finalTimeStamp = -1;
if (HeartRateSensor) {
  const heartRateSensorConfig = {
    frequency: HEART_RATE.FREQUENCY,
    sample: HEART_RATE.SAMPLE,
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
    physioState.heartRate.push(tsHeartRate);
  });

  hrm.start();
} else {
  console.error("No heart rate sensor");
}
