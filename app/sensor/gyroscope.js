import { Gyroscope } from 'gyroscope';
import { GYROSCOPE } from '../config';
import { physioState } from '../physio';
import { newMilliClock, updateMilliClock, getTimeMilliClock } from './milliClock';
import { setGyroscopeView } from '../view/sensor';

if (GYROSCOPE.ENABLED && Gyroscope) {
  const gyroscopeSensorConfig = {
    frequency: GYROSCOPE.FREQUENCY,
    sample: GYROSCOPE.SAMPLE,
  };
  const gyroscope = new Gyroscope(gyroscopeSensorConfig);
  const milliClock = newMilliClock(gyroscope);

  gyroscope.addEventListener('reading', () => {
    updateMilliClock(milliClock);

    const tsGyroscope = {
      timestamp: getTimeMilliClock(milliClock),
      gyroscope: {
        x: gyroscope.x,
        y: gyroscope.y,
        z: gyroscope.z,
      },
    };

    physioState.gyroscope.push(tsGyroscope);
    setGyroscopeView(gyroscope.x, gyroscope.y, gyroscope.z);
  });

  gyroscope.addEventListener('activate', () => {
    console.log('gyroscope sensor activated');
    setGyroscopeView(-1, -1, -1);
  });

  gyroscope.start();
} else {
  if(!GYROSCOPE.ENABLED) {
    console.log('gyroscope sensor disabled');
  } else {
    console.error('gyroscope sensor not found');
  }
}
