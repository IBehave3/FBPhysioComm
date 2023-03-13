import { OrientationSensor } from 'orientation';
import { ORIENTATION } from '../config';
import { physioState } from '../physio';
import { newMilliClock, updateMilliClock, getTimeMilliClock } from './milliClock';
import { setOrientationView } from '../view/sensor';

if(ORIENTATION.ENABLED && OrientationSensor) {
  const orientationSensorConfig = {
    frequency: ORIENTATION.FREQUENCY,
    sample: ORIENTATION.SAMPLE,
  };
  const orientation = new OrientationSensor(orientationSensorConfig);
  const milliClock = newMilliClock(orientation);

  orientation.addEventListener('reading', () => {
    updateMilliClock(milliClock);

    const tsOrienation = {
      timestamp: getTimeMilliClock(milliClock),
      orientation: {
        x: orientation.quaternion[0],
        y: orientation.quaternion[1],
        z: orientation.quaternion[2],
        scalar: orientation.quaternion[3],
      },
    };
    
    physioState.orientation.push(tsOrienation);
    setOrientationView(orientation.quaternion[0],
                       orientation.quaternion[1],
                       orientation.quaternion[2],
                       orientation.quaternion[3]);
  });

  orientation.addEventListener('activate', () => {
    console.log('orientation sensor activated');
    setOrientationView(-1, -1, -1, -1);
  });

  orientation.start();
} else {
  if(!ORIENTATION.ENABLED) {
    console.log('orientation sensor disabled');
  } else {
    console.error('orientation sensor not found');
  }
}
