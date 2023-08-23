import { Accelerometer } from 'accelerometer';
import { ACCELEROMETER } from '../config';
import { setAccelerometerView } from '../view/sensor';
import { AccelerometerReading } from 'accelerometer';
import { sendMessage } from '../util/message';

export interface AccelerometerModel {
  timestampISO: string,
  x: number,
  y: number,
  z: number,
}

if (ACCELEROMETER.ENABLED && Accelerometer) {
  const accelerometer = new Accelerometer({
    frequency: ACCELEROMETER.FREQUENCY,
  });

  accelerometer.addEventListener('reading', () => {
    if(accelerometer.x == null || accelerometer.y == null || accelerometer.z == null) {
      return;
    }

    const accelerometerModel: AccelerometerModel = {
      timestampISO: new Date(Date.now()).toISOString(),
      x: accelerometer.x,
      y: accelerometer.y,
      z: accelerometer.z,
    }

    sendMessage({
      message_id: ACCELEROMETER.MESSAGE_ID,
      data: accelerometerModel,
    });

    setAccelerometerView(accelerometerModel); 
  });

  accelerometer.addEventListener('activate', () => {
    console.log('accelerometer sensor activated');
  });

  accelerometer.start();
} else {
  if(!ACCELEROMETER.ENABLED) {
    console.log('accelerometer sensor disabled');
  } else {
    console.error('accelerometer sensor not found');
  }
}
