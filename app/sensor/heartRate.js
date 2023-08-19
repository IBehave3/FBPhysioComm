import { HeartRateSensor } from 'heart-rate';
import { HEART_RATE } from '../config'
import { physioState } from '../physio';
import { newMilliClock, updateMilliClock, getTimeMilliClock } from './milliClock';
import { setHeartRateView } from '../view/sensor';

if (HEART_RATE.ENABLED && HeartRateSensor) {
  const heartRateSensorConfig = {
    frequency: HEART_RATE.FREQUENCY,
    sample: HEART_RATE.SAMPLE,
  };
  const hrm = new HeartRateSensor(heartRateSensorConfig);
  const milliClock = newMilliClock(hrm);

  hrm.addEventListener('reading', () => {
    updateMilliClock(milliClock);
    
    const tsHeartRate = {
      timestamp: new Date(Date.now()).toISOString(),
      heartRate: hrm.heartRate, 
    };

    physioState.heartRate.push(tsHeartRate);
    setHeartRateView(hrm.heartRate); 
  });

  hrm.addEventListener('activate', () => {
    console.log('heart rate sensor activated');
    setHeartRateView(-1);
  });

  hrm.start();
} else {
  if(!HEART_RATE.ENABLED) {
    console.log('heart rate sensor disabled');
  } else {
    console.error('heart rate sensor not found');
  }
}

