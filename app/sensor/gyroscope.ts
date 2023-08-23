import { Gyroscope, GyroscopeReading } from 'gyroscope';
import { GYROSCOPE } from '../config';
import { setGyroscopeView } from '../view/sensor';
import { sendMessage } from '../util/message';

export interface GyroscopeModel {
  timestampISO: string,
  x: number,
  y: number,
  z: number,
}

if (GYROSCOPE.ENABLED && Gyroscope) {
  const gyroscope = new Gyroscope({
    frequency: GYROSCOPE.FREQUENCY,
  });

  gyroscope.addEventListener('reading', () => {
    if(gyroscope.x === null || gyroscope.y === null || gyroscope.z === null) {
      return;
    }

    const gyroscopeModel: GyroscopeModel = {
      timestampISO: new Date(Date.now()).toISOString(),
      x: gyroscope.x,
      y: gyroscope.y,
      z: gyroscope.z,
    }

    sendMessage({
      messageId: GYROSCOPE.MESSAGE_ID,
      data: gyroscopeModel,
    });

    setGyroscopeView(gyroscopeModel); 
  });

  gyroscope.addEventListener('activate', () => {
    console.log('gyroscope sensor activated');
  });

  gyroscope.start();
} else {
  if(!GYROSCOPE.ENABLED) {
    console.log('gyroscope sensor disabled');
  } else {
    console.error('gyroscope sensor not found');
  }
}
