import { Accelerometer } from 'accelerometer';
import { ACCELEROMETER } from '../config';
import { physioState } from '../physio';
import { newMilliClock, updateMilliClock, getTimeMilliClock } from './milliClock';
import { setAccelerometerView } from '../view/sensor';

if (ACCELEROMETER.ENABLED && Accelerometer) {
  const accelerometerSensorConfig = {
    frequency: ACCELEROMETER.FREQUENCY,
    sample: ACCELEROMETER.SAMPLE,
  }

  const accelerometer = new Accelerometer(accelerometerSensorConfig);
  const milliClock = newMilliClock(accelerometer);

  accelerometer.addEventListener('reading', () => {
    updateMilliClock(milliClock);

    const tsAccelerometer = {
      timestamp: getTimeMilliClock(milliClock),
      accelerometer: {
        x: accelerometer.x,
        y: accelerometer.y,
        z: accelerometer.z,
      },
    };

    physioState.accelerometer.push(tsAccelerometer);
    setAccelerometerView(accelerometer.x, accelerometer.y, accelerometer.z);
  });

  accelerometer.addEventListener('activate', () => {
    console.log('accelerometer sensor activated');
    setAccelerometerView(-1, -1, -1);
  });

  accelerometer.start();
} else {
  if(!ACCELEROMETER.ENABLED) {
    console.log('accelerometer sensor disabled');
  } else {
    console.error('accelerometer sensor not found');
  }
}
